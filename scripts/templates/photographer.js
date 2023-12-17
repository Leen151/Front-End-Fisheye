function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.classList.add("photographer");
        
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        const localisation = document.createElement('h3');
        localisation.classList.add("localisation");
        localisation.textContent = city + ", " + country;

        const description = document.createElement('p');
        description.classList.add("description");
        description.textContent = tagline;

        const prix = document.createElement('p');
        prix.classList.add("price");        
        prix.textContent = String(price) + "€/jour";

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(localisation);
        article.appendChild(description);
        article.appendChild(prix);
        return (article);
    }

    return { name, id, picture, getUserCardDOM }
}