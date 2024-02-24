import { createModal } from "../utils/modal.js";

class PhotographerApp{
	constructor() {
		this.photographerPage = document.getElementById("main");

		this.photographersApi = new PhotographerApi("../../data/photographers.json");
		this.mediasApi = new MediaApi("../../data/photographers.json");
	}

	async main() {
		const body = document.querySelector("body");

		////////////////////////////////////// PROFIL PHOTOGRAPHE //////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////////
		// on recherche les paramètres mis dans l'URL
		const urlParams = new URLSearchParams(window.location.search);
		// on recupère le paramètre "photographer" dans l'url qui correspond à l'id
		// et on le parse en int afin de pouvoir faire la comparaison avec les ids des données json
		const idUrl = parseInt(urlParams.get("photographer"));

		// on récupère les données du photographe
		const photographerData = await this.photographersApi.getPhotographerById(idUrl);
		// on transforme les données en objet "Photographer"
		const photographer = new Photographer(photographerData);

		// calcul du total des likes //
		let totalLikes = 0;
		const likesData = await this.mediasApi.getLikesByPhotographerId(idUrl);

		for (let i = 0; i < likesData.length; i++) {
			totalLikes += likesData[i];
		}

		// on crée le html
		const sec = document.createElement("section");
		sec.classList.add("photographer-infos");
		this.photographerPage.appendChild(sec);

		const template = new PhotographerProfile(photographer, totalLikes);
		sec.innerHTML = (template.getPhotographerPageDOM());

		// on récupére le bouton pour afficher le formulaire de contact
		// on crée l'event listener
		const contactButtons = document.querySelectorAll(".contact_button");
		contactButtons.forEach(button => {
			button.addEventListener("click", (event) => {
				event.preventDefault();
				toggleModal(button);
			});
		});


		/////////////////////////////// PARTIE GALERIE //////////////////////////////////////
		/////////////////////////////////////////////////////////////////////////////////////
		//création de la balise section pour la galerie et du squelette html
		const section = document.createElement("section");
		section.classList.add("photographer-gallery");
		this.photographerPage.appendChild(section);

		section.innerHTML = `
			<div class="filters-content">
<!--				<div class="filters" id="filterTitle">-->
<!--					filtre par titre-->
<!--				</div>-->
<!--				<div class="filters" id="filterDate">-->
<!--					filtre par date-->
<!--				</div>-->
<!--				<div class="filters" id="filterLikes">-->
<!--					filtre par like-->
<!--				</div>-->
				
				<label for="sort-btn">Trier par</label>
				<select name="sort" id="sort-btn">
				  <option class="filters" id="filterTitle">Popularité</option>
				  <option class="filters" id="filterDate">Date</option>
				  <option class="filters" id="filterLikes">Titre</option>
				</select>
			</div>
			<div class="gallery">
			</div>
		`;

		const filterDate = document.getElementById("filterDate");
		const filterLikes = document.getElementById("filterLikes");
		const filterTitle = document.getElementById("filterTitle");
		const gallery = document.querySelector(".gallery");


		// Récupération des données
		const mediaData = await this.mediasApi.getMediaByPhotographerId(idUrl);

		// création du système de tri
		filterTitle.addEventListener("click", () => {
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
		});

		filterLikes.addEventListener("click", () => {
			let mediaSortedByLikes = Array.from(mediaData);

			mediaSortedByLikes.sort(function (a, b) {
				return a.likes - b.likes;
			});
			gallery.innerHTML = "";

			const allMedia = mediaConvertion(mediaSortedByLikes);
			createGallery(allMedia, totalLikes);
		});

		filterDate.addEventListener("click", () => {
			let mediaSortedByDate = Array.from(mediaData);

			mediaSortedByDate.sort(function (a, b) {
				return a.date.localeCompare(b.date);
			});
			gallery.innerHTML = "";

			const allMedia = mediaConvertion(mediaSortedByDate);
			createGallery(allMedia, totalLikes);
		});

		// création de la galerie au premier chargement
		const allMedia = mediaConvertion(mediaData);
		createGallery(allMedia, totalLikes);


		////// Partie Fonctions /////////
		/////////////////////////////////

		// Transformation des données
		function mediaConvertion(data){
			// Ici, on transforme le tableau de données en un tableau d'objet Movie grace au Model appelé par le factory
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
		function createGallery(allMedia, totalLikes){
			// pour chaque valeur du tableau, on crée une card Media selon le template défini
			allMedia
				.forEach((media) => {
					const template = new MediaCard(media);
					gallery.appendChild(template.getMediaCardDOM());
				});

			//hors de la boucle car sinon l'élément du dom est écrasé à chaque itération de la boucle
			const mediaThumbnail = document.querySelectorAll(".media-thumbnail");
			mediaThumbnail.forEach((element, index) => {
				element.addEventListener("click", () => toggleModal(element, index, allMedia));
			});


			//////////////////// partie likes ////////////////
			const likesBtn = document.querySelectorAll(".likes");

			likesBtn.forEach((element, index) => {
				element.addEventListener("click", (event) => {
					totalLikes = updateTotalLikesAndLikesByMedia(element, index, allMedia, totalLikes);
				});
			});
		}

		// Mise à jour des likes par média et du total
		// 2 façons de faire sont illustrées ici
		// soit on récupère la valeur inscrite dans la balise - cas likes par médias
		// soit on récupère l'infos de la variable ou de l'objet créé précédemment (il faut alors retourner la valeur pour stocker sa modification) - cas totalLikes
		function updateTotalLikesAndLikesByMedia(element, index, allMedia, totalLikes){
			const elementCurrent = document.getElementById(allMedia[index].id);
			let likes = parseInt(elementCurrent.innerText, 10);

			if (element.dataset.liked === "true") {
				element.dataset.liked = "false";
				likes -= 1;
				totalLikes -= 1;

			} else {
				element.dataset.liked = "true";
				likes += 1;
				totalLikes +=1;
			}

			// Maj affichage du nombre de likes de l'image
			elementCurrent.innerText = `${likes}`;
			// Maj du total de likes
			const totalLikesElement = document.querySelector(".total-likes");
			totalLikesElement.innerText = `${totalLikes}`;

			return totalLikes;

			// autre methode de mise à jour du total de likes mais alors le bouton contact est recréé et l'event listener ne marche plus
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

		// Fonction pour basculer l'état de la modal en active
		function toggleModal(clickedElement, index, allMedia) {
			const modalContainer = document.querySelector(".modal");
			if (!modalContainer) {
				createModal(clickedElement, index, allMedia, photographer.name);
			}
			body.classList.toggle("modal-active");
		}
	}
}

const photographerApp = new PhotographerApp();
photographerApp.main();