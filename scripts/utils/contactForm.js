function contactForm(photographerName) {
	return `	
	<header class="header-form">
		<h2>Contactez-moi <br> ${photographerName}</h2>
		<img src="assets/icons/close.svg" class="close_modal" id="closeModalBtn" alt="icone croix pour la fermeture de la modale"/>
	</header>
	<form class="contactFormBody">
		<div>
			<label for="first" class="firstLabel">Prénom <span class="required">*</span></label><br>
			<input class="text-control" type="text" id="first" name="first"><br>
			<span class="erreur" id="erreurFirst"></span>
			
			<label for="last">Nom <span class="required">*</span></label><br>
			<input class="text-control" type="text" id="last" name="last"><br>
			<span class="erreur" id="erreurLast"></span>
			
			<label for="email">E-mail <span class="required">*</span></label><br>
			<input class="text-control" type="text" id="email" name="email"><br>
			<span class="erreur" id="erreurEmail"></span>
			
			<label for="messageForm">Message</label>
			<textarea id="messageForm"/></textarea>
			<span class="erreur" id="erreurMessageForm"></span>
		</div>		
		<button class="send_btn" id="sendBtn">Envoyer</button>
	</form>	
	`;
}

function sendContactForm() {
	//DOM elements
	const form = document.querySelector(".contactFormBody");
	const firstName = document.getElementById("first");
	const lastName = document.getElementById("last");
	const email = document.getElementById("email");
	const message = document.getElementById("messageForm");

	const errorFirst = document.getElementById("erreurFirst");
	const errorLast = document.getElementById("erreurLast");
	const errorEmail = document.getElementById("erreurEmail");
	const errorMessage = document.getElementById("erreurMessageForm");

	const sendBtn = document.getElementById("sendBtn");

	///// Déclaration des constantes et des fonctions pour le traitement du formulaire /////
	////////////////////////////////////////////////////////////////////////////////////////
	const regExEmail = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"); // regEx pour une adresse mail
	const regExName = new RegExp("^[A-Za-z-]{2,64}$"); //regEx pour avoir au moins 2 lettres et 64 max (accepte le -)

	const errorMessageText = "Ce champ est obligatoire";

	// création d'un objet servant à stocker le contenu du formulaire
	const informations = {
		firstName: "",
		lastName: "",
		email: "",
		message: ""
	};


	// fonction générique pour vérifier un champ à l'aide d'une regEx et gérer l'affichage des messages d'erreur
	function verifierChamp(champ, regEx, champErreur) {
		if (champ.value.trim() === "") {
			champErreur.innerHTML = errorMessageText;
			return false;
		} else {
			champErreur.innerHTML = "";
			return true;
		}
	}


	//////////// Soumission du formulaire /////////////
	///////////////////////////////////////////////////
	form.addEventListener("submit", (event) => {
		event.preventDefault();

		// vérification que les conditions d'utilisation sont validées
		let cguChecked = false;
		if (!cguCheck.checked) {
			errorCGU.innerHTML = messages.cgu;
		} else {
			errorCGU.innerHTML = "";
			informations.cgu = true;
			cguChecked = true;
		}

		let checkFirstName = verifierChamp(firstName, regExName, errorFirst);
		let checkLastName = verifierChamp(lastName, regExName, errorLast);
		let checkEmail = verifierChamp(email, regExEmail, errorEmail);
		let checkMessage = verifierChamp(message, regExEmail, errorMessage);

		// Si tous les champs sont remplis correctement, l'objet informations est rempli avec les valeurs du formulaire
		// Un message de succès s'affiche à l'écran et l'objet est affiché dans la console.
		if (checkFirstName
			&& checkLastName
			&& checkEmail
			&& checkMessage
		) {
			informations.firstName = firstName.value.trim();
			informations.lastName = lastName.value.trim();
			informations.email = email.value.trim();
			informations.message = message.value.trim();

			// let modalSuccess = `
			// <div class="div-success"><p> Merci <span>${informations.firstName}</span> !<br> Votre réservation a bien été reçue. </p></div>
			// <button class="btn-close">Fermer</button> `
			//
			// modalContent.innerHTML = modalSuccess;
			// modalContent.classList.add("succes-msg")
			// const closeBtn2 = document.querySelector(".btn-close");
			// closeBtn2.addEventListener("click", closeModal);

			console.log(informations);
		}
	});
}

export { contactForm, sendContactForm };


// function gestionModal(){
// // utilisation de l'event load pour s'assurer que tout est bien chargé avant d'utiliser ce code
// // dans la cas contraire, le bouton "contacter-moi" est introuvable car créé dans un script
//
// 	function displayModal() {
// 		//const modal = document.getElementById("contact_modal");
// 		modal.style.display = "block";
// 	}
//
// 	function closeModal() {
// 		//const modal = document.getElementById("contact_modal");
// 		modal.style.display = "none";
// 	}
//
//
// 	const btnOpenModal = document.querySelector(".contact_button");
// 	console.log(btnOpenModal);
// 	btnOpenModal.addEventListener("click", displayModal);
// 	const modal = document.getElementById("contact_modal");
// 	const formHtml = `
// 	<h2 xmlns="http://www.w3.org/1999/html">Contactez-moi</h2>
// 	<img src="assets/icons/close.svg" class="close_modal"/>
// 	<form>
// 		<div>
// 			<label for="premonForm">Prénom</label>
// 			<input id="premonForm"/>
// 			<label for="nomForm">Nom</label>
// 			<input id="nomForm"/>
// 			<label for="emailForm">Email</label>
// 			<input id="emailForm"/>
// 			<label for="messageForm">Message</label>
// 			<textarea id="messageForm"/></textarea>
// 	</div>
//
// 	<button class="contact_button">Envoyer</button>
// 	</form>
// 	`;
// 	modal.innerHTML=formHtml;
//
// 	const btnCloseModal = document.querySelector(".close_modal");
// 	btnCloseModal.addEventListener("click", closeModal);


// /////// Vérification des champs AVANT la soumission ////////
// ////////////////////////////////////////////////////////////
// // vérification du Prénom
// let checkFirstName = false; // variable servant à enregistrer si le champ est valide ou non
// firstName.addEventListener("blur", function () {
// 	checkFirstName = verifierChamp(firstName, regExName, messages.first, errorFirst);
// 	// la variable prendra la valeur retournée par la fonction verifierChamp()
// });
//
// // vérification du Nom
// let checkLastName = false;
// lastName.addEventListener("blur", function () {
// 	checkLastName = verifierChamp(lastName, regExName, messages.last, errorLast);
// });
//
// // vérification de l'adresse mail
// let checkEmail = false;
// email.addEventListener("blur", function () {
// 	checkEmail = verifierChamp(email, regExEmail, messages.email, errorEmail);
// });
//
// // vérification du nombre de tournois
// let checkQuantity = false;
// quantity.addEventListener("blur", function () {
// 	checkQuantity = verifierChamp(quantity, regExQuantity, messages.quantity, errorQuantity);
// });
//
// // vérification de la date
// const oneYearTime = 365 * 24 * 60 * 60 * 1000;  // durée d'une année en milliseconde
// const todayTime = new Date().getTime();  // nombre de millisecondes écoulées depuis le premier janvier 1970 à minuit UTC jusqu'au jour actuel
//
// let checkDate = false;
// dateBirthday.addEventListener("blur", function () {
// 	const birthdayNumber = new Date(dateBirthday.value).getTime();  // nombre de millisecondes écoulées jusqu'à la date renseignée
// 	const age = (todayTime - birthdayNumber) / oneYearTime // "age" de l'inscrit(e)
// 	const conditionAge = age<15
//
// 	checkDate = verifierDate(dateBirthday, regExDate, messages.date, conditionAge, messages.age, errorDate)
// });