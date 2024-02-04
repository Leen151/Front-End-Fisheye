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
				const Template = new PhotographerCard(photographer);
				this.photographersSection.appendChild(
					Template.getUserCardDOM()
				);
			});
	}
}

const index = new IndexApp();
index.main();

