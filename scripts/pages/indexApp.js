class IndexApp {
	constructor() {
		this.photographersSection = document.querySelector(".photographer_section");
		this.photographersApi = new PhotographerApi("../../data/photographers.json");
	}

	async main() {
		const photographersData = await this.photographersApi.getPhotographers();
		console.log(photographersData);

		photographersData
			.map(photographer => new Photographer(photographer))
			.forEach(photographer => {
				const template = new PhotographerCard(photographer);
				this.photographersSection.appendChild(
					template.getPhotographerCardDOM()
				);
			});
	}
}

const index = new IndexApp();
index.main();

