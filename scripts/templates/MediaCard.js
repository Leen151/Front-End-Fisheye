class MediaCard {
	constructor(media) {
		this._media = media;
	}

	getMediaCardDOM() {
		const article = document.createElement("article");
		article.classList.add("media-card");

		if (this._media.image) {
			article.innerHTML = `
				<img src="${this._media.image}" alt="photo: ${this._media.title}">
				<div class="media-infos">
					<h2 class="title-media">${this._media.title}</h2>
					<div class="likes">
						<p>${this._media.likes}</p>
						<svg xmlns="http://www.w3.org/2000/svg" height="24" width="22" viewBox="0 0 512 512">
							<path fill="#901C1C" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
						</svg>
					</div>
				</div>
		`;
		} else if (this._media.video) {
			article.innerHTML = `
				<video src="${this._media.video}" controls></video>
				<div class="media-infos">
					<h2 class="title-media">${this._media.title}</h2>
					<div class="likes">
						<p>${this._media.likes}</p>
						<svg xmlns="http://www.w3.org/2000/svg" height="24" width="22" viewBox="0 0 512 512">
							<path fill="#901C1C" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/>
						</svg>						
					</div>
				</div>
		`;
		} else {
			article.innerHTML = "Aucun contenu multimédia disponible";
		}

		return (article);
	}

}