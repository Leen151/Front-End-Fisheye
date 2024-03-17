import {contactForm, sendContactForm} from "../utils/contactForm.js";
import {lightbox, updateIndexToNextMedia, updateIndexToPreviousMedia, updateContent} from "../utils/lightbox.js";

class PhotographerApp {
	constructor() {
		this.photographerPage = document.getElementById("main");

		this.photographersApi = new PhotographerApi("../../data/photographers.json");
		this.mediasApi = new MediaApi("../../data/photographers.json");
	}

	async main() {
		const body = document.querySelector("body");

		////////////////////////////////////// PROFIL PHOTOGRAPHE //////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////
		// on recherche le paramètre "photographer" dans l'url qui correspond à l'id
		// et on le parse en int afin de pouvoir faire la recherche sur les ids des données json
		const urlParams = new URLSearchParams(window.location.search);
		const idUrl = parseInt(urlParams.get("photographer"));

		// on récupère les données du photographe puis on transforme les données en objet "Photographer"
		const photographerData = await this.photographersApi.getPhotographerById(idUrl);
		const photographer = new Photographer(photographerData);

		// calcul du total des likes
		let totalLikes = 0;
		const likesData = await this.mediasApi.getLikesByPhotographerId(idUrl);
		for (let i = 0; i < likesData.length; i++) {
			totalLikes += likesData[i];
		}

		//on récupère l'element du DOM
		const photographerInfosSection = document.querySelector(".photographer-infos");

		const template = new PhotographerProfile(photographer, totalLikes);
		photographerInfosSection.innerHTML = await template.getPhotographerPageDOM();


		// on récupére le bouton pour afficher le formulaire de contact
		// on crée l'event listener
		const contactButtons = document.querySelector(".contact_button");
		const contactFormModal = document.querySelector(".modal-contactForm");
		const contactFormModalContent = await contactForm(photographer.name);
		contactButtons.addEventListener("click", () => {
			contactFormModal.innerHTML = contactFormModalContent;
			openModal(contactFormModal);

			const firstField = document.querySelector("#first");
			firstField.focus();

			sendContactForm(contactFormModal, photographer.name);
			closeModale(contactFormModal);
		});


		/////////////////////////////// PARTIE GALERIE //////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////
		//on récupère l'element du DOM
		const gallery = document.querySelector(".gallery");
		const sortBtn = document.getElementById("sort-btn");

		// Récupération des données
		const mediaData = await this.mediasApi.getMediaByPhotographerId(idUrl);

		// gestion du tri avec un select
		sortBtn.addEventListener("change", () => {
			const selectedOption = sortBtn.value;

			switch (selectedOption) {
			case "filterTitle":
				sortByTitle();
				break;
			case "filterDate":
				sortByDate();
				break;
			case "filterLikes":
				sortByLikes();
				break;
			}
		});

		// création de la galerie au premier chargement
		const allMedia = mediaConvertion(mediaData);
		createGallery(allMedia, totalLikes);


		////// Partie Fonctions /////////
		// fonctions de tri
		function sortByLikes() {
			let mediaSortedByLikes = Array.from(mediaData);

			mediaSortedByLikes.sort(function (a, b) {
				return b.likes - a.likes;
			});
			gallery.innerHTML = "";

			const allMedia = mediaConvertion(mediaSortedByLikes);
			createGallery(allMedia, totalLikes);
		}

		function sortByTitle() {
			let mediaSortedByTitle = Array.from(mediaData);

			mediaSortedByTitle.sort(function (a, b) {
				const titleA = a.title.toLowerCase();
				const titleB = b.title.toLowerCase();

				if (titleA < titleB) {
					return -1;
				}
				if (titleA > titleB) {
					return 1;
				}
				return 0;
			});
			gallery.innerHTML = "";

			const allMedia = mediaConvertion(mediaSortedByTitle);
			createGallery(allMedia, totalLikes);
		}

		function sortByDate() {
			let mediaSortedByDate = Array.from(mediaData);

			mediaSortedByDate.sort(function (a, b) {
				return a.date.localeCompare(b.date);
			});
			gallery.innerHTML = "";

			const allMedia = mediaConvertion(mediaSortedByDate);
			createGallery(allMedia, totalLikes);
		}


		// Transformation des données en objet selon les models de données
		function mediaConvertion(data) {
			// Ici, on transforme le tableau de données en un tableau d'objet Photo ou Video grace au Model appelé par le factory
			// le model appelé est conditionné selon que l'objet retourné à un attribut image ou vidéo
			const allMedia = [];
			data.forEach(media => {
				if (media.image) {
					allMedia.push(new MediasFactory(media, "photo", photographer.name));
				} else if (media.video) {
					allMedia.push(new MediasFactory(media, "video", photographer.name));
				}
			});
			return allMedia;
		}

		// Génération de la galerie de média
		function createGallery(allMedia, totalLikes) {
			// pour chaque valeur du tableau, on crée une card Media selon le template défini
			allMedia
				.forEach((media) => {
					const template = new MediaCard(media);
					gallery.appendChild(template.getMediaCardDOM());
				});

			//// ouverture de la lightbox
			const mediaThumbnail = document.querySelectorAll(".media-thumbnail");
			const lightboxModal = document.querySelector(".modal-lightbox");

			mediaThumbnail.forEach((element, index) => {
				const lightboxModalContent = lightbox(allMedia, index);

				element.addEventListener("click", () => {
					lightboxModal.innerHTML = lightboxModalContent;
					openModal(lightboxModal);
					closeModale(lightboxModal);

					gestionBtndirectionnel(index);
				});

				element.addEventListener("keydown", (event) =>{
					if ((event.key === "Enter" || event.keyCode === 13)) {
						lightboxModal.innerHTML = lightboxModalContent;
						openModal(lightboxModal);
						closeModale(lightboxModal);

						gestionBtndirectionnel(index);
					}
				});
			});

			// gestion des likes
			const likesBtn = document.querySelectorAll(".likes");
			likesBtn.forEach((element, index) => {
				// au click
				element.addEventListener("click", () => {
					totalLikes = updateTotalLikesAndLikesByMedia(element, index, allMedia, totalLikes);
				});
				//si appui sur "enter"
				element.addEventListener("keydown", (event) => {
					// Vérifiez si la touche enfoncée est "Enter" (code 13) et si l'élément a le focus
					if ((event.key === "Enter" || event.keyCode === 13) && document.activeElement === element) {
						totalLikes = updateTotalLikesAndLikesByMedia(element, index, allMedia, totalLikes);
					}
				});
			});
		}

		// Mise à jour des likes par média et du total
		// 2 façons de faire sont illustrées ici
		// soit on récupère la valeur inscrite dans la balise - cas likes par médias
		// soit on récupère l'infos de la variable créée précédemment qui est passée en paramètre (il faut alors retourner la valeur pour "enregistrer" sa modification) - cas totalLikes
		function updateTotalLikesAndLikesByMedia(element, index, allMedia, totalLikes) {
			const elementCurrent = document.getElementById(allMedia[index].id);
			let likes = parseInt(elementCurrent.innerText, 10);

			if (element.dataset.liked === "true") {
				element.dataset.liked = "false";
				likes -= 1;
				totalLikes -= 1;
			} else {
				element.dataset.liked = "true";
				likes += 1;
				totalLikes += 1;
			}

			// Maj affichage du nombre de likes de l'image
			elementCurrent.innerText = `${likes}`;
			// Maj du total de likes
			const totalLikesElement = document.querySelector(".total-likes");
			totalLikesElement.innerText = `${totalLikes}`;

			return totalLikes;

			// autre methode de mise à jour du total de likes
			// let photographerInfos = document.querySelector(".photographer-infos");
			//
			// // reconstruction de la 1ere section avec le bon total
			// const template = new PhotographerProfile(photographer, totalLikes);
			// photographerInfos.innerHTML = template.getPhotographerPageDOM();
			//
			// //recréation de l'eventlistener
			// const contactButtons = document.querySelectorAll(".contact_button");
			// contactButtons.forEach(button => {
			// 	button.addEventListener("click", (event) => {
			// 		event.preventDefault();
			// 		toggleModal(button);
			// 	});
			// });
		}

		function openModal(divContainer){
			// divContainer.style.display = "block";
			divContainer.style.visibility = "visible";

			const baliseMain = document.querySelector("main");
			const header = document.querySelector("header");
			baliseMain.setAttribute("aria-hidden", "true");
			header.setAttribute("aria-hidden", "true");
		}

		function closeModale(modal){
			const closeModalBtn = document.querySelectorAll("#closeModalBtn");
			const baliseMain = document.querySelector("main");
			const header = document.querySelector("header");
			const modalOverlay = document.querySelector(".modal-overlay");

			closeModalBtn.forEach((button) => {
				button.addEventListener("click", () => {
					// modal.style.display = "none";
					modal.style.visibility = "hidden";
					baliseMain.setAttribute("aria-hidden", "false");
					header.setAttribute("aria-hidden", "false");
					modal.setAttribute("aria-hidden", "true");
				});
			});
			modalOverlay.addEventListener("click", () => {
				// modalContainer.remove();
				// baliseMain.setAttribute("aria-hidden", "false");
				modal.style.visibility = "hidden";
				baliseMain.setAttribute("aria-hidden", "false");
				header.setAttribute("aria-hidden", "false");
				modal.setAttribute("aria-hidden", "true");
			});
			window.addEventListener("keydown", (event) =>{
				if (event.key === "Escape" || event.key === "Esc") {
					modal.style.visibility = "hidden";
					baliseMain.setAttribute("aria-hidden", "false");
					header.setAttribute("aria-hidden", "false");
					modal.setAttribute("aria-hidden", "true");
				}
			});
		}

		function gestionBtndirectionnel(index) {
			const btnLeft = document.querySelector(".leftBtn");
			const btnRight = document.querySelector(".rightBtn");
			const mediaLightbox = document.querySelector(".mediaLightbox");

			btnLeft.focus();

			btnLeft.addEventListener("click", (event) => {
				event.preventDefault();
				const newIndex = updateIndexToPreviousMedia(allMedia.length, index);
				index = newIndex;

				mediaLightbox.innerHTML = updateContent(allMedia, newIndex);
			});
			document.addEventListener("keydown", function (event) {
				if (event.code === "ArrowLeft") {
					btnLeft.click();
				}
			});

			btnRight.addEventListener("click", (event) => {
				event.preventDefault();
				const newIndex = updateIndexToNextMedia(allMedia.length, index);
				index = newIndex;

				mediaLightbox.innerHTML = updateContent(allMedia, newIndex);

			});
			document.addEventListener("keydown", function (event) {
				if (event.code === "ArrowRight") {
					btnRight.click();
				}
			});
		}
	}
}

const photographerApp = new PhotographerApp();
photographerApp.main();