class PhotographerCard {
	constructor(photographer) {
		this._photographer = photographer;
	}

	getPhotographerCardDOM() {
		const article = document.createElement("article");
		article.classList.add("photographer");

		article.innerHTML = `
            <a href="photographer.html?photographer=${this._photographer.id}" aria-labelledby="name-photographer">
				<div class="img-container">
					<img src="${this._photographer.portrait}" class="photographer-picture" alt="Lien vers la page de ${this._photographer.name}">
				</div>
				<h2 class="photographer-name" id="name-photographer">
					${this._photographer.name}
				</h2>
            </a>
            <div class="text-container" aria-label="Informations" tabindex="0">
				<p class="localisation" aria-label="localisation">${this._photographer.city}, ${this._photographer.country}</p>
				<p class="description" aria-label="description">${this._photographer.tagline}</p>
				<p class="price" aria-label="prix">${this._photographer.price}€/jour</p>
            </div>
        `;

		return (article);
	}
}