function lightbox(media) {
	console.log(media)

	// media est le contenu html de la card sur laquelle on a clické
	// ici on récupère le texte contenu dans le h2 qui conrrespond au titre
	const h2Content = media.querySelector('.media-card h2.title-media').textContent;

	// on va ici récupérer le src du média et conditionné une balise selon qu'on a une image ou une video
	let src = null;
	let baliseMedia = null;
	if(media.querySelector('.media-card img')){
		src = media.querySelector('.media-card img').src;
		baliseMedia = `<img src="${src}" alt="${h2Content}">`
	}
	else if(media.querySelector(".media-card video")){
		src = media.querySelector(".media-card video").src;
		//baliseMedia = `<video src="${src}" controls></video>`
		baliseMedia = ` 
		<video controls>
			<source src="${src}" type="video/mp4">
			Votre navigateur ne supporte pas la lecture de vidéos.
		</video>
		`
	}
	else {
		return `
			<img src="../../assets/404.jpg" alt="">
		`
	}

	return `
	<div class="leftBtn">
		<img src="../../assets/icons/chevron-left-solid.svg" alt="">
	</div>
	<div class="imageLightbox">		
		${baliseMedia}
		<h2>${h2Content}</h2>
	</div>
	<div class="rightBtn">
		<img src="../../assets/icons/chevron-right-solid.svg" alt="">
	</div>
	`;
}

function gestionLightbox(allMedia, index){
	console.log(allMedia);
	console.log(index)

}
export { lightbox, gestionLightbox };