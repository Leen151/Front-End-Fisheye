import {lightbox, updateIndexToPreviousMedia, updateIndexToNextMedia, UpdateContent} from "./lightbox.js";
import {contactForm, sendContactForm} from "./contactForm.js";
export {createModal};

// Fonction pour créer la structure de la modal
function createModal(clickedElement, index, allMedia, photographerName) {
	const body = document.querySelector("body");
	// Eléments de la modal
	const modalContainer = document.createElement("div");
	modalContainer.classList.add("modal");
	const modalOverlay = document.createElement("div");
	modalOverlay.classList.add("modal-overlay");
	const modalContent = document.createElement("div");
	modalContent.classList.add("modal-content");
	modalContent.setAttribute("role", "dialog");


	// déclaration de variables pour le contenu et la class de modal-content
	let containerContent, modalContentClass;

	// création contenu et class selon le clic sur .media-thumbnail ou .contact_button
	if (clickedElement.classList.contains("media-thumbnail")) {
		// appel le contenu de la fonction lightbox
		containerContent = lightbox(allMedia, index);

		modalContentClass = "lightbox";
		buildModal(containerContent, modalContentClass, modalContent);

		const btnLeft = modalContent.querySelector(".leftBtn");
		const btnRight = modalContent.querySelector(".rightBtn");
		const mediaLightbox = modalContent.querySelector(".mediaLightbox");

		btnLeft.addEventListener("click", (event) => {
			event.preventDefault();
			const newIndex = updateIndexToPreviousMedia(allMedia.length, index);
			index = newIndex;

			mediaLightbox.innerHTML = UpdateContent(allMedia, newIndex);
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

			mediaLightbox.innerHTML = UpdateContent(allMedia, newIndex);

		});
		document.addEventListener("keydown", function (event) {
			if (event.code === "ArrowRight") {
				btnRight.click();
			}
		});

	} else if (clickedElement.classList.contains("contact_button")) {
		// appel le contenu de la fonction contactform
		containerContent = contactForm(photographerName);
		modalContentClass = "contactForm";
		buildModal(containerContent, modalContentClass, modalContent);
		sendContactForm(modalContent, photographerName);

		// const blabla = modalContent.querySelector("#first");
		//
		// blabla.focus({preventScroll:true});

	}

	// fermeture de la modal au clic sur la croix, hors de la modal ou sur echap
	const closeModalBtn = modalContent.querySelector("#closeModalBtn");
	const baliseMain = document.querySelector("main");

	closeModalBtn.addEventListener("click", () => {
		body.classList.toggle("modal-active");
		modalContainer.remove();
		//baliseMain.setAttribute("aria-hidden", "false");
	});
	modalOverlay.addEventListener("click", () => {
		body.classList.toggle("modal-active");
		modalContainer.remove();
		//baliseMain.setAttribute("aria-hidden", "false");
	});
	window.addEventListener("keydown", (event) =>{
		if (event.key === "Escape" || event.key === "Esc") {
			body.classList.toggle("modal-active");
			modalContainer.remove();
		}
		//baliseMain.setAttribute("aria-hidden", "false");
	});

	// construction du DOM
	const main = document.querySelector("main");


	modalContainer.appendChild(modalOverlay);
	modalContainer.appendChild(modalContent);
	// body.appendChild(modalContainer);
	body.insertBefore(modalContainer, main);
}

// fonction qui crée le contenu de la modale et lui donne une class css selon les paramètres
function buildModal(containerContent, modalContentClass, modalContent){
	//ajout du contenu selectionné
	modalContent.innerHTML = `
       ${containerContent}
        <div class="close_modal" id="closeModalBtn" tabindex="4">
            <svg  width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="white"/>
            </svg>
        </div> 
        `;
	// ajout de la class selectionnée
	modalContent.classList.add(modalContentClass);
}