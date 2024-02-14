import {lightbox, updateIndexToPreviousMedia, updateIndexToNextMedia, UpdateContent} from "../utils/lightbox.js";
import {contactForm, sendContactForm} from "../utils/contactForm.js";

class PhotographerApp{
	constructor() {
		this.photographerPage = document.getElementById("main");

		this.photographersApi = new PhotographerApi("../../data/photographers.json");
		this.mediasApi = new MediaApi("../../data/photographers.json");
	}

	async main() {
		////// PROFIL PHOTOGRAPHE ///////
		/////////////////////////////////
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

		// on crée le html à afficher
		const template = new PhotographerProfile(photographer, totalLikes);
		this.photographerPage.appendChild(template.getPhotographerPageDOM());

		// on récupére le bouton pour afficher le formulaire de contact
		// on crée l'event listener
		const contactButton = document.querySelector(".contact_button");
		contactButton.addEventListener("click", () => toggleModal(contactButton));

		/////// PARTIE GALERIE ///////
		//////////////////////////////
		// Récupération des données
		const mediaData = await this.mediasApi.getMediaByPhotographerId(idUrl);

		// Ici, on transforme le tableau de données en un tableau d'objet Movie grace au Model appelé par le factory
		// le model appelé est conditionné selon que l'objet retourné à un attribut image ou vidéo
		const allMedia = [];
		mediaData.forEach(media => {
			if (media.image) {
				allMedia.push(new MediasFactory(media, "photo", photographer.name));
			} else if (media.video) {
				allMedia.push(new MediasFactory(media, "video", photographer.name));
			}
		});

		// création de la balise section pour la galerie
		const section = document.createElement("section");
		section.classList.add("photographer-gallery");
		this.photographerPage.appendChild(section);

		// pour chaque valeur du tableau, on crée une card Media selon le template défini
		allMedia
			.forEach((media) => {
				const template = new MediaCard(media);
				section.appendChild(template.getMediaCardDOM());
			});

		const mediaCard = document.querySelectorAll(".media-card");

		mediaCard.forEach((element, index) => {
			element.addEventListener("click", () => toggleModal(element, index));
		});

		/////// PARTIE MODALE ///////
		/////////////////////////////
		const body = document.querySelector("body");

		// Fonction pour basculer l'état de la modal (active)
		function toggleModal(clickedElement, index) {
			const modalContainer = document.querySelector(".modal");
			if (!modalContainer) {
				createModal(clickedElement, index, allMedia);
			}
			body.classList.toggle("modal-active");
		}

		// Fonction pour créer la structure de la modal
		function createModal(clickedElement, index, allMedia) {
			// Eléments de la modal
			const modalContainer = document.createElement("div");
			modalContainer.classList.add("modal");
			const modalOverlay = document.createElement("div");
			modalOverlay.classList.add("modal-overlay");
			const modalContent = document.createElement("div");
			modalContent.classList.add("modal-content");

			// déclaration de variables pour le contenu et la class de modal-content
			let containerContent, modalContentClass;

			// création contenu et class selon le clic sur .media-card ou .contact_button
			if (clickedElement.classList.contains("media-card")) {
				// appel le contenu de la fonction lightbox
				containerContent = lightbox(allMedia, index);

				modalContentClass = "lightbox";
				buildModal(containerContent, modalContentClass);

				console.log(modalContent.innerHTML);
				const btnLeft = modalContent.querySelector(".leftBtn");
				const btnRight = modalContent.querySelector(".rightBtn");
				const titi = modalContent.querySelector(".imageLightbox");

				btnLeft.addEventListener("click", (event) => {
					event.preventDefault();
					let toto = updateIndexToPreviousMedia(allMedia.length, index);
					index = toto;

					titi.innerHTML = UpdateContent(allMedia, toto);
				});


				btnRight.addEventListener("click", (event) => {
					event.preventDefault();
					let toto = updateIndexToNextMedia(allMedia.length, index);
					index = toto;

					titi.innerHTML = UpdateContent(allMedia, toto);

				});
			} else if (clickedElement.classList.contains("contact_button")) {
				// appel le contenu de la fonction contactform
				containerContent = contactForm(photographer.name);
				modalContentClass = "contactForm";
				buildModal(containerContent, modalContentClass);
				sendContactForm(modalContent, photographer.name);
			}

			// fonction qui crée le contenu de la modale et lui donne une class css selon les paramètres
			function buildModal(containerContent, modalContentClass){
				//ajout du contenu selectionné
				modalContent.innerHTML = `

				${containerContent}
				<div class="close_modal" id="closeModalBtn">
					<svg  width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="white"/>
					</svg>
				</div>
				`;
				// ajout de la class selectionnée
				modalContent.classList.add(modalContentClass);
			}

			// fermeture de la modal au clic sur la croix, hors de la modal ou sur echap
			const closeModalBtn = modalContent.querySelector("#closeModalBtn");

			closeModalBtn.addEventListener("click", () => {
				body.classList.remove("modal-active");
				modalContainer.remove();
			});
			modalOverlay.addEventListener("click", () => {
				body.classList.remove("modal-active");
				modalContainer.remove();
			});
			window.addEventListener("keydown", (event) =>{
				if (event.key === "Escape" || event.key === "Esc") {
					body.classList.remove("modal-active");
					modalContainer.remove();
				}
			});

			// construction du DOM
			modalContainer.appendChild(modalOverlay);
			modalContainer.appendChild(modalContent);
			body.appendChild(modalContainer);
		}
	}
}

const photographerApp = new PhotographerApp();
photographerApp.main();
