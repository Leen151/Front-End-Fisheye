import { contactForm, sendContactForm } from "./contactForm.js";
// import { lightbox } from "./lightbox.js";

function modal(photographerName) {
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


		// Variables pour le contenu et la classe de modal-content
		let containerContent, modalContentClass;

		// Vérifiez quel élément a été cliqué entre .media-card et .contact_button
		if (clickedElement.classList.contains("media-card")) {
			// appel le contenu de la fonction lightbox
			containerContent = "<p>Ici sera affiché le contenu de la futur lightbox.</p>";
			modalContentClass = "lightbox";
		} else if (clickedElement.classList.contains("contact_button")) {
			// appel le contenu de la focntion contactform
			containerContent = contactForm(photographerName);
			modalContentClass = "contactForm";
			sendContactForm();
		}

		modalContent.innerHTML = `
            ${containerContent}
<!--			<button id="closeModalBtn">x</button>-->
        `;	

		// Ajoute la classe spécifique à modal-content selon le contenu
		modalContent.classList.add(modalContentClass);

		// Gestionnaires d'événements pour le bouton de fermeture et l'overlay
		const closeModalBtn = modalContent.querySelector("#closeModalBtn");

		closeModalBtn.addEventListener("click", () => {
			body.classList.remove("modal-active");
			modalContainer.remove();
		});

		modalOverlay.addEventListener("click", () => {
			body.classList.remove("modal-active");
			modalContainer.remove();
		});

		// hiérarchies des éléments de la modal
		modalContainer.appendChild(modalOverlay);
		modalContainer.appendChild(modalContent);

		body.appendChild(modalContainer);
	}
}

export { modal };
