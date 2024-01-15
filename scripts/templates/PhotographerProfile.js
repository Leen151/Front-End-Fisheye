class PhotographerProfile {
	constructor(photographer) {
		this._photographer = photographer;
	}

	getPhotographerPageDOM(totalLikes) {
		const section = document.createElement('section');
		section.classList.add("photographer-infos");
		//const section = document.querySelector(".photographer-infos")

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
		    
		    <p class="price">${totalLikes} 
		    	<svg xmlns="http://www.w3.org/2000/svg" height="24" width="22" viewBox="0 0 512 512">
					<path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
				</svg>
		    	${this._photographer.price}€/jour
		    </p>
        `;

		return (section);
	}

}


