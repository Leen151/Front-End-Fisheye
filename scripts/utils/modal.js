import { contactForm, sendContactForm } from "./contactForm.js";
import { lightbox } from "./lightbox.js";

function modal(photographerName, allMedia) {

	// Sélection des éléments cliquables
	const clickableElements = document.querySelectorAll(".media-card, .contact_button");
	const body = document.querySelector("body");

	// Ecouteur d'événement pour chaque élément cliquable
	clickableElements.forEach(
		(element) => element.addEventListener("click", () => toggleModal(element))
	);

	// Fonction pour basculer l'état de la modal (active)
	function toggleModal(clickedElement) {
		const modalContainer = document.querySelector(".modal");
		if (!modalContainer) {
			createModalModal(clickedElement);
		}
		body.classList.toggle("modal-active");
		console.dir(clickedElement)
	}

	// Fonction pour créer la structure de la modal
	function createModalModal(clickedElement) {

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
			containerContent = lightbox();
			modalContentClass = "lightbox";
			buildModal(containerContent, modalContentClass);
			console.log(allMedia);
		} else if (clickedElement.classList.contains("contact_button")) {
			// appel le contenu de la focntion contactform
			containerContent = contactForm(photographerName);
			modalContentClass = "contactForm";
			buildModal(containerContent, modalContentClass);
			sendContactForm(modalContent, photographerName);
		}

		function buildModal(containerContent, modalContentClass){
			//ajout du contenu selectionné
			modalContent.innerHTML = `
			${containerContent}
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

		modalContainer.appendChild(modalOverlay);
		modalContainer.appendChild(modalContent);
		body.appendChild(modalContainer);
	}
}

export { modal };
