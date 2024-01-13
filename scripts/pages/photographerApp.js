class PhotographerApp{
	constructor() {
		this.photographerPage = document.getElementById("main");
		this.photographersApi = new PhotographerApi("../../data/photographers.json");
	}

	async main() {
		// on recherche les paramètres mis dans l'URL
		const urlParams = new URLSearchParams(window.location.search);
		// on recupère le paramètre "photographer" correspondant à l'id
		// et on le parse en int afin de pouvoir faire la comparaison avec les ids des données json
		const idUrl = parseInt(urlParams.get('photographer'));
		console.log( typeof idUrl)

		const photographerData = await this.photographersApi.getPhotographerById(idUrl);
		console.log(photographerData);
		const photographer = new Photographer(photographerData);
		const template = new PhotographerProfile(photographer);
		this.photographerPage.appendChild(template.getPhotographerPageDOM());
	}
}

const photographerApp = new PhotographerApp();
photographerApp.main();