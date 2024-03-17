class MediaCard {
	constructor(media) {
		this._media = media;
	}

	getMediaCardDOM() {
		const article = document.createElement("article");
		article.classList.add("media-card");

		let  baliseMedia = null;
		if (this._media.image) {
			baliseMedia = `<img src="${this._media.image}" alt="${this._media.title} - open lightbox" class="media-thumbnail" tabindex="0">`;
			// baliseMedia = `<a href="#"><img src="${this._media.image}" alt="${this._media.title} - open lightbox" class="media-thumbnail"></a>`;
		}else if (this._media.video) {
			baliseMedia = `<video src="${this._media.video}" class="media-thumbnail" aria-label="${this._media.title} - open lightbox" tabindex="0"></video>`;
		}

		if(baliseMedia){
			article.innerHTML = `
			${baliseMedia}
			<div class="media-infos">
				<h2 class="title-media" >${this._media.title}</h2>
				<div class="likes" data-liked = "false" role="button" aria-label="bouton like" tabindex="0">
					<p class="likes-number" id="${this._media.id}" aria-label="nombre de likes">
						${this._media.likes}
					</p>
					<img src="../../assets/icons/like2.svg" class="heart" alt="likes - bouton pour liker l'image">
				</div>
			</div>
			`;
		}else {
			article.innerHTML = "Aucun contenu multimédia disponible";
		}

		return (article);
	}
}