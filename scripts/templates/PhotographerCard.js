class PhotographerCard {
    constructor(photographer) {
        this._photographer = photographer;
    }

    getUserCardDOM() {
        const { name, id, city, country, portrait, tagline, price } = this._photographer;

        const article = document.createElement('article');
        article.classList.add("photographer");

        const href = window.location.href + id;
        const alt =  "portrait de " + name;
        const localisation = city + ", " + country;
        const nameClass = name.trim().split(' ').join('-');

        article.innerHTML = `
            <a href="${href}">
              <div class="img-container" >
                <img src="${this._photographer.portrait}" class="photographer-portrait" alt="${alt}">
              </div>
              <h2 class="photographer-name">
                ${name}
              </h2>
            </a>
<!--            <div class="text-container">-->
              <p class="localisation">${localisation}</p>
              <p class="description">${this._photographer.tagline}</p>
              <p class="price">${this._photographer.price}€/jour</p>
<!--            </div>-->
        `;

        return (article);
    }
}