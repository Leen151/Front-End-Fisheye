function lightbox(allMedia, index) {
	// on récupère le titre de l'image dans le tableau en fonction de l'index
	const imageTitle = allMedia[index].title;

	// on va ici récupérer le src du média et conditionné une balise selon qu'on a une image ou une video
	let src = null;
	let baliseMedia = null;
	if(allMedia[index].image){
		src = allMedia[index].image;
		baliseMedia = `<img src="${src}" alt="${imageTitle}">`;
	}
	else if(allMedia[index].video){
		src = allMedia[index].video;
		baliseMedia = ` 
		<video controls>
			<source src="${src}" type="video/mp4">
			Le navigateur ne supporte pas la lecture de vidéos.
		</video>
		`;
	}
	else {
		return `
			<img src="../../assets/404.jpg" alt="">
		`;
	}

	return `
	<div class="leftBtn">
		<img src="../../assets/icons/chevron-left-solid.svg" alt="">
	</div>
	<div class="imageLightbox">		
		${baliseMedia}
		<h2>${imageTitle}</h2>
	</div>
	<div class="rightBtn">
		<img src="../../assets/icons/chevron-right-solid.svg" alt="">
	</div>
	`;
}

function updateIndexToPreviousMedia(tableLength, index){
	console.log(index + " index");

	if (index > 0){
		return index - 1;
	}
	else if (index === 0){
		//console.log(allMedia.length-1)
		return tableLength - 1;
	}
}

function updateIndexToNextMedia(tableLength, index){
	console.log(index + " index");

	if (index < tableLength - 1){
		return index + 1;
	}
	else if (index === tableLength - 1){
		return 0;
	}
}
export { lightbox, updateIndexToPreviousMedia, updateIndexToNextMedia };