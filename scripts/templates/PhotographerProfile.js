class PhotographerProfile {
	constructor(photographer) {
		this._photographer = photographer;
	}

	getPhotographerPageDOM() {
		const { name, id, city, country, portrait, tagline, price } = this._photographer;

		const urlParams = new URLSearchParams(window.location.search);
		const idUrl = urlParams.get('photographer');


		// const main = document.getElementById("main");

		const section = document.createElement('section');
		section.classList.add("photographer-infos");

		// const href = window.location.href + id;
		const alt = "portrait de " + name;
		const localisation = city + ", " + country;
		// const nameClass = name.trim().split(' ').join('-');

		section.innerHTML = `
			<div class="infos_text">
				<h1>${name}</h1>              
				<p class="localisation">${localisation}</p>
				<p class="description">${this._photographer.tagline}</p>			
			</div>
			
			<button class="contact_button">Contactez-moi</button>

		    <div class="img-container" >
				<img src="${this._photographer.portrait}" class="photographer-picture" alt="${alt}">
		    </div>              
        `;

		// <p class="price">${this._photographer.price}€/jour</p>
		return (section);
	}

}


