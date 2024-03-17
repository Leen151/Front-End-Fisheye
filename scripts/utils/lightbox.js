function lightbox(allMedia, index){
	// on récupère le titre de l'image dans le tableau en fonction de l'index
	const imageTitle = allMedia[index].title;

	// on va construire une balise selon qu'on a une image ou une video comme média
	let baliseMedia = null;
	if(allMedia[index].image){
		baliseMedia = `<img src="${allMedia[index].image}" alt="${imageTitle}" tabindex="0">`;
	}
	else if(allMedia[index].video){
		baliseMedia = ` 
		<video controls tabindex="0">
			<source src="${allMedia[index].video}" type="video/mp4">
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
	<div class="modal-overlay"></div>
	<div class="lightbox-content" role="dialog" aria-hidden="false">	
		<button class="leftBtn">
			<img src="../../assets/icons/chevron-left-solid.svg" alt="">
		</button>
		<div class="mediaLightbox">		
			${baliseMedia}
			<h2>${imageTitle}</h2>
		</div>
		<button class="rightBtn">
			<img src="../../assets/icons/chevron-right-solid.svg" alt="">
		</button>	
		<button class="close_modal" id="closeModalBtn">
			<svg  width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M42 4.23L37.77 0L21 16.77L4.23 0L0 4.23L16.77 21L0 37.77L4.23 42L21 25.23L37.77 42L42 37.77L25.23 21L42 4.23Z" fill="white"/>
			</svg>
		</button>	
	</div>
	`;
}


function updateIndexToPreviousMedia(tableLength, index){
	if (index > 0){
		return index - 1;
	}
	else if (index === 0){
		return tableLength - 1;
	}
}

function updateIndexToNextMedia(tableLength, index){
	if (index < tableLength - 1){
		return index + 1;
	}
	else if (index === tableLength - 1){
		return 0;
	}
}

function updateContent(allMedia, index){
	let baliseMedia = "";
	if (allMedia[index].image) {
		baliseMedia = `
					<img src="${allMedia[index].image}" alt="${allMedia[index].title};">
					`;
	}
	if (allMedia[index].video) {
		baliseMedia = ` 
					<video controls>
						<source src="${allMedia[index].video}" type="video/mp4">
						Le navigateur ne supporte pas la lecture de vidéos.
					</video>
					`;
	}

	return `
	${baliseMedia}
	<h2>${allMedia[index].title}</h2>
	`;
}

export { lightbox, updateIndexToPreviousMedia, updateIndexToNextMedia, updateContent };