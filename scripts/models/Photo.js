class Photo {
	constructor(photo, photographerName) {
		this._id = photo.id;
		this._photographerId = photo.photographerId;
		this._title = photo.title;
		this._image = photo.image;
		this._likes = photo.likes;
		this._date = photo.date;
		this._price = photo.price;
		this._photographerMediaSrc = photographerName.replace(" ", "_"); //construction dynamique du chemin vers les fichiers média
	}

	get id() {
		return this._id;
	}

	get photographerId() {
		return this._photographerId;
	}

	get title() {
		return this._title;
	}

	get image() {
		return `/assets/medias/${this._photographerMediaSrc}/${this._image}`;
	}

	get likes() {
		return this._likes;
	}

	get date() {
		return this._date;
	}

	get price() {
		return this._price;
	}
}