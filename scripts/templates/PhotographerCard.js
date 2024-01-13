class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer;
    }

    getUserCardDOM() {
        const { name, id, city, country, portrait, tagline, price } = this._photographer;

        const article = document.createElement('article');
        article.classList.add("photographer");

        console.log(id + "id")
        article.innerHTML = `
            <a href="photographer.html?photographer=${id}">
              <div class="img-container" >
                <img src="${this._photographer.portrait}" class="photographer-picture" alt="photo portrait de ${name}">
              </div>
              <h2 class="photographer-name">
                ${name}
              </h2>
            </a>
<!--            <div class="text-container">-->
              <p class="localisation">${city}, ${country}</p>
              <p class="description">${this._photographer.tagline}</p>
              <p class="price">${this._photographer.price}€/jour</p>
<!--            </div>-->
        `;

        return (article);
    }
}