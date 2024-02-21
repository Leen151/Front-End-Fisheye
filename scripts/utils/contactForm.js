function contactForm(photographerName) {
	return `
	<div class="contactFormContent">
		<header class="header-form">
			<h2>Contactez-moi <br> ${photographerName}</h2>
		</header>
		<form class="contactFormBody">
			<div>
				<label for="first" class="firstLabel">Prénom</label>
				<input class="text-control" type="text" id="first" name="first">
				<span class="error" id="errorFirst"></span>
				
				<label for="last">Nom</label>
				<input class="text-control" type="text" id="last" name="last">
				<span class="error" id="errorLast"></span>
				
				<label for="email">E-mail</label>
				<input class="text-control" type="text" id="email" name="email">
				<span class="error" id="errorEmail"></span>
				
				<label for="messageForm">Message</label> 
				<textarea rows="4" id="messageForm"/></textarea>
				<span class="error" id="errorMessageForm"></span>
			</div>		
			<button class="send_btn" id="sendBtn" type="submit">Envoyer</button>
		</form>	
	</div>
	`;
}

function sendContactForm(modalContent, photographerName) {
	// DOM elements
	const contactFormContent = modalContent.querySelector(".contactFormContent");
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
		}
	});
}

export { contactForm, sendContactForm };