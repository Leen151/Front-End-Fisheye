function lightbox() {

	//Elements du DOM
	const lightbox = document.getElementById("lightbox");
	console.log(lightbox);
	const cardsOpenModal = document.querySelectorAll(".media-card");
	console.log(cardsOpenModal);

	// Écouteurs d'événements pour ouvrir la modal
	cardsOpenModal.forEach((card) => card.addEventListener("click", toggleModal));

	// fonction pour l'ouverture de la modal, on ajoute la class active à notre modal container
	function toggleModal() {
		lightbox.classList.toggle("active");
		//createModalLightbox();
	}


	function createModalLightbox() {

	}


}
export { lightbox };