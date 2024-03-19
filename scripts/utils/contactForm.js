async function contactForm(photographerName) {
	return `
    <div class="modal-overlay"></div>
	<div class="contactForm-content" role="dialog" aria-hidden="false" tabindex="0">
		<header class="header-form">
			<h2 id="title-contactform-modal">Contactez-moi <br> ${photographerName}</h2>
		</header>
		<form class="contactFormBody">
			<div>
				<label for="first" id="first-label">Prénom</label>
				<input class="text-control" type="text" id="first" name="first" aria-labelledby="first-label" aria-required=true>
				<span class="error" id="errorFirst"></span>
				
				<label for="last" id="last-label">Nom</label>
				<input class="text-control" type="text" id="last" name="last" aria-labelledby="last-label" aria-required=true>
				<span class="error" id="errorLast"></span>
				
				<label for="email" id="email-label">E-mail</label>
				<input class="text-control" type="text" id="email" name="email" aria-labelledby="email-label" aria-required=true>
				<span class="error" id="errorEmail"></span>
				
				<label for="messageForm" id="messge-label">Message</label> 
				<textarea rows="4" id="messageForm" aria-labelledby="messge-label" aria-required=true></textarea>
				<span class="error" id="errorMessageForm"></span>
			</div>		
			<button class="send_btn" id="sendBtn" type="submit">Envoyer</button>
		</form>	
		<button class="close_modal" id="closeModalBtn" aria-label="Fermer la modal">
			<img src="../../assets/icons/close.svg" alt="fermer le formulaire de contact">
		</button>
	</div>    	
	`;
}

function sendContactForm(modalContent, photographerName) {
	// DOM elements
	const contactFormContent = modalContent.querySelector(".contactForm-content");
	const form = modalContent.querySelector(".contactFormBody");
	const firstName = modalContent.querySelector("#first");
	const lastName = modalContent.querySelector("#last");
	const email = modalContent.querySelector("#email");
	const message = modalContent.querySelector("#messageForm");

	const errorFirst = modalContent.querySelector("#errorFirst");
	const errorLast = modalContent.querySelector("#errorLast");
	const errorEmail = modalContent.querySelector("#errorEmail");
	const errorMessage = modalContent.querySelector("#errorMessageForm");

	//// Déclaration des constantes et des fonctions pour le traitement du formulaire /////
	////////////////////////////////////////////////////////////////////////////////////////
	const regExEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"); // regEx pour une adresse mail

	// création d'un objet servant à stocker le contenu du formulaire
	const messageSent = {
		messageRecipient: photographerName,
		firstName: "",
		lastName: "",
		email: "",
		message: ""
	};

	// fonctions pour vérifier les champs et afficher les messages d'erreur
	// vérification que le champ n'est pas vide
	function checkFieldEmpty(field, errorField) {
		if (field.value.trim() === "") {
			errorField.innerHTML = "Ce champ est obligatoire";
			return false;
		} else {
			errorField.innerHTML = "";
			return true;
		}
	}
	//vérification du format de ce qui est entré dans l'input (pour l'adresse mail)
	function checkFieldFormat(field, regEx, errorField) {
		if (field.value.trim() === "") {
			errorField.innerHTML = "Ce champ est obligatoire";
			return false;
		} else if (!regEx.test(field.value.trim())) {
			errorField.innerHTML = "Le format de l'adresse mail renseignée n'est pas valide";
			return false;
		} else {
			errorField.innerHTML = "";
			return true;
		}
	}

	//////////// Soumission du formulaire /////////////
	///////////////////////////////////////////////////
	form.addEventListener("submit", (event) => {
		event.preventDefault();

		let checkFirstName = checkFieldEmpty(firstName, errorFirst);
		let checkLastName = checkFieldEmpty(lastName, errorLast);
		let checkEmail = checkFieldFormat(email, regExEmail, errorEmail);
		let checkMessage = checkFieldEmpty(message, errorMessage);

		// Si tous les champs sont remplis correctement, l'objet informations est rempli avec les valeurs du formulaire
		// Un message de succès s'affiche à l'écran et l'objet est affiché dans la console.
		if (checkFirstName && checkLastName && checkEmail && checkMessage){
			messageSent.firstName = firstName.value.trim();
			messageSent.lastName = lastName.value.trim();
			messageSent.email = email.value.trim();
			messageSent.message = message.value.trim();

			contactFormContent.innerHTML = `
				<p class="div-success"> Votre message a été envoyé avec succès. </p>
			`;
			contactFormContent.classList.add("succes-msg");

			console.log(messageSent);
			closeModalIfSuccess(modalContent, contactFormContent);
		}
	});
}

function closeModalIfSuccess(modal, content) {
	// Ferme la modal automatiquement après 2 secondes
	setTimeout(function() {
		modal.style.visibility = "hidden";

		const baliseMain = document.querySelector("main");
		const header = document.querySelector("header");

		baliseMain.setAttribute("aria-hidden", "false");
		header.setAttribute("aria-hidden", "false");
		content.setAttribute("aria-hidden", "true");
	}, 2000); // 2000 ms = 2 secondes
}

export { contactForm, sendContactForm };
