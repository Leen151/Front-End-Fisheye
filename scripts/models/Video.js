class Video {
	constructor(video) {
		this._id = video.id;
		this._photographerId = video.photographerId;
		this._title = video.title;
		this._video = video.video;
		this._likes = video.likes;
		this._date = video.date;
		this._price = video.price;
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

	get video() {
		switch (this._photographerId){
			case 243:
				return `/assets/medias/Mimi Keel/${this._video}`;
			case 930:
				return `/assets/medias/Ellie-Rose Wilkens/${this._video}`;
			case 82:
				return `/assets/medias/Tracy Galindo/${this._video}`;
			case 527:
				return `/assets/medias/Nabeel Bradford/${this._video}`;
			case 925:
				return `/assets/medias/Rhode Dubois/${this._video}`;
			case 195:
				return `/assets/medias/Marcel Nikolic/${this._video}`;	
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