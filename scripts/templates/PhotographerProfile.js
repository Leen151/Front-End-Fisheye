class PhotographerProfile {
	constructor(photographer, totalLikes) {
		this._photographer = photographer;
		this._totalLikes = totalLikes;
	}

	async getPhotographerPageDOM() {
		return `
			<div class="infos_text">
				<h1 class="photographer-name" aria-label="nom" >${this._photographer.name}</h1>      	   
				<div >
					<p class="localisation">${this._photographer.city}, ${this._photographer.country}</p>
					<p class="description">${this._photographer.tagline}</p>		
				</div>
			</div>
			
			<button class="contact_button" aria-label="Contact Me">Contactez-moi</button>

		    <div class="img-container">
				<img src="${this._photographer.portrait}" class="photographer-picture" alt="${this._photographer.name}" >
		    </div>
		    
		    <div class="more-details" >
				<p class="total-likes" aria-label="nombre total de votes">${this._totalLikes}</p>
				<img src="../../assets/icons/like.svg" alt="likes" class="heart">
		    	<p class="price">${this._photographer.price}€/jour</p>
		    </div>
        `;
	}
}


