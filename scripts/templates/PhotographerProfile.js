class PhotographerProfile {
	constructor(photographer) {
		this._photographer = photographer;
	}

	getPhotographerPageDOM() {
		const section = document.createElement('section');
		section.classList.add("photographer-infos");

		section.innerHTML = `
			<div class="infos_text">
				<h1 class="photographer-name">${this._photographer.name}</h1>      	        
				<p class="localisation">${this._photographer.city}, ${this._photographer.country}</p>
				<p class="description">${this._photographer.tagline}</p>			
			</div>
			
			<button class="contact_button">Contactez-moi</button>

		    <div class="img-container" >
				<img src="${this._photographer.portrait}" class="photographer-picture" alt="photo portrait de ${this._photographer.name}">
		    </div>              
        `;

		// <p class="price">${this._photographer.price}€/jour</p>
		return (section);
	}

}


