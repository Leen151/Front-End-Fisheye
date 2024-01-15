class Photo {
	constructor(photo) {
		this._id = photo.id;
		this._photographerId = photo.photographerId;
		this._title = photo.title;
		this._image = photo.image;
		this._likes = photo.likes;
		this._date = photo.date;
		this._price = photo.price;
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
		switch (this._photographerId){
			case 243:
				return `/assets/medias/Mimi Keel/${this._image}`;
			case 930:
				return `/assets/medias/Ellie-Rose Wilkens/${this._image}`;
			case 82:
				return `/assets/medias/Tracy Galindo/${this._image}`;
			case 527:
				return `/assets/medias/Nabeel Bradford/${this._image}`;
			case 925:
				return `/assets/medias/Rhode Dubois/${this._image}`;
			case 195:
				return `/assets/medias/Marcel Nikolic/${this._image}`;	
			default:
			// par défaut si aucun cas ne correspond
			return `/assets/404.jpg`;			
		}
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