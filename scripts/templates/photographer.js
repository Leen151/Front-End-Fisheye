function photographerTemplate(data) {
    const { name, id, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const linkCard = document.createElement('a');

        console.log(window.location.href + "url") ;
        const href = window.location.href + id;

        linkCard.setAttribute("href", href);
        
        const article = document.createElement('article');
        article.classList.add("photographer");

        const img = document.createElement('img');
        img.setAttribute("src", picture)

        const alt =  "portrait de " + name;
        img.setAttribute("alt", alt);

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
        prix.textContent = `${price}€/jour`;

        
        linkCard.appendChild(article);

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(localisation);
        article.appendChild(description);
        article.appendChild(prix);
        return (linkCard);
    }

    return { name, id, picture, getUserCardDOM }
}