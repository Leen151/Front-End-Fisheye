function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        // const linkCard = document.createElement('a');
        //
        // console.log(window.location.href + "url") ;
        // const href = window.location.href + id;
        //
        // linkCard.setAttribute("href", href);
        //
        // const article = document.createElement('article');
        // article.classList.add("photographer");
        //
        // const img = document.createElement('img');
        // img.setAttribute("src", picture)
        //
        // const alt =  "portrait de " + name;
        // img.setAttribute("alt", alt);
        //
        // const h2 = document.createElement( 'h2' );
        // h2.textContent = name;
        //
        // const localisation = document.createElement('h3');
        // localisation.classList.add("localisation");
        // localisation.textContent = city + ", " + country;
        //
        // const description = document.createElement('p');
        // description.classList.add("description");
        // description.textContent = tagline;
        //
        // const prix = document.createElement('p');
        // prix.classList.add("price");
        // prix.textContent = `${price}€/jour`;
        //
        //
        // linkCard.appendChild(article);
        //
        // article.appendChild(img);
        // article.appendChild(h2);
        // article.appendChild(localisation);
        // article.appendChild(description);
        // article.appendChild(prix);

        const article = document.createElement('article');
        article.classList.add("photographer");

        const href = window.location.href + id;
        const alt =  "portrait de " + name;
        const localisation = city + ", " + country;
        const nameClass = name.trim().split(' ').join('-');

        const cardPhotographer = `
            <a href="${href}">
              <div class="img-container" >
                <img src="${picture}" class="photographer-portrait" alt="${alt}">
              </div>
              <h2 class="photographer-name">
                ${name}
              </h2>
            </a>
<!--            <div class="text-container">-->
              <p class="localisation">${localisation}</p>
              <p class="description">${tagline}</p>
              <p class="price">${price}€/jour</p>
<!--            </div>-->
        `;

        article.innerHTML = cardPhotographer;
        return (article);
    }

    return { name, id, picture, getUserCardDOM }
}