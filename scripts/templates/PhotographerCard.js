class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer;
    }

    getUserCardDOM() {
        const article = document.createElement('article');
        article.classList.add("photographer");

        article.innerHTML = `
            <a href="photographer.html?photographer=${this._photographer.id}">
              <div class="img-container" >
                <img src="${this._photographer.portrait}" class="photographer-picture" alt="photo portrait de ${this._photographer.name}">
              </div>
              <h2 class="photographer-name">
                ${this._photographer.name}
              </h2>
            </a>
<!--            <div class="text-container">-->
              <p class="localisation">${this._photographer.city}, ${this._photographer.country}</p>
              <p class="description">${this._photographer.tagline}</p>
              <p class="price">${this._photographer.price}€/jour</p>
<!--            </div>-->
        `;

        return (article);
    }
}