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
		return this._video;
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