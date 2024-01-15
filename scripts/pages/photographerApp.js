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
		const idUrl = parseInt(urlParams.get('photographer'));

		// on récupère les données du photographe
		const photographerData = await this.photographersApi.getPhotographerById(idUrl);
		// on transforme les données en objet "Photographer"
		const photographer = new Photographer(photographerData);

		// calcul du total des likes //
		let totalLikes = 0;
		const likesData = await this.mediasApi.getLikesByPhotographerId(idUrl);
		console.log(likesData);

		for (let i = 0; i < likesData.length; i++) {
			totalLikes += likesData[i];
		}

		// on crée le html à afficher
		const template = new PhotographerProfile(photographer);
		this.photographerPage.appendChild(template.getPhotographerPageDOM(totalLikes));


		/////// PARTIE GALERIE ///////
		//////////////////////////////
		const photosData = await this.mediasApi.getPhotosByPhotographerId(idUrl);
		const videosData = await this.mediasApi.getVideosByPhotographerId(idUrl);
		console.log(photosData);
		console.log(videosData);
		
		// // Ici, je transforme mon tableau de données en un tableau d'objet Movie grace au Model appelé par le factory
		const Photos = photosData.map(photo => new MediasFactory(photo, "photo"));
		const Videos = videosData.map(video => new MediasFactory(video, "video"));
		
		//on rassemble les 2 tableaux
		const FullMedia = Photos.concat(Videos);

		// création de la balise section pour la galerie
		const section = document.createElement("section");
		section.classList.add("photographer-gallery");
		this.photographerPage.appendChild(section);

		// pour chaque valeur du tableau, on crée une card Media selon le template défini
		FullMedia
			.forEach(media => {
				const template = new MediaCard(media);
				section.appendChild(template.getMediaCardDOM());
			})
	}
}

const photographerApp = new PhotographerApp();
photographerApp.main();