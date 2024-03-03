class Api {
	/**
     *
     * @param {string} url
     */
	constructor(url) {
		this._url = url;
	}

	async get() {
		return fetch(this._url)
			.then(res => res.json())
			.catch(err => console.log("an error occurs", err));
	}

	async getById(id, typeData) {
		return this.get()
			.then(data => data[typeData].find(item => item.id === id));
	}
}

class PhotographerApi extends Api {
	/**
     *
     * @param {string} url
     */
	constructor(url) {
		super(url);
	}

	async getPhotographers() {
		return await this.get()
			.then(data => data.photographers);
	}

	async getPhotographerById(id){
		return this.getById(id, "photographers");
	}
}

class MediaApi extends Api {
	/**
     *
     * @param {string} url
     */
	constructor(url) {
		super(url);
	}

	async getMediaByPhotographerId(id){
		return this.get()
			.then(data => data.media
				.filter(item => item.photographerId === id));
	}

	async getLikesByPhotographerId(id){
		return this.get()
			.then(data => data.media
				.filter(item => item.photographerId === id)
				.map(item => item.likes)
			);
	}

	// async getMediaById(id){
	// 	return this.getById(id, "media");
	// }
}
