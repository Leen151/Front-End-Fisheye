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
            .catch(err => console.log('an error occurs', err));
    }

    async getById(id, typeData) {
        return this.get()
            .then(data => data[typeData].find(item => item.id === id))
        // return fetch(this._url)
        //     .then(res => res.json())
        //     .then(data => {
        //
        //         if (typeData) {
        //             data = data[typeData]; //donnera par ex: data.photographers
        //         }
        //         const filteredData = data.find(item => item.id === id);
        //         if (filteredData) {
        //             data = filteredData;
        //         } else {
        //             console.log(`Aucune correspondance trouvée pour l'ID : ${id}`);
        //             data = null;
        //         }
        //     })
        //     .catch(err => {
        //         console.log('Une erreur s\'est produite', err);
        //     });
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
        return this.getById(id, 'photographers');
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
                .filter(item => item.photographerId === id))
    }

    // async getPhotosByPhotographerId(id){
    //     return this.get()
    //     .then(data => data.media
    //         .filter(item => item.photographerId === id && item.hasOwnProperty('image')))
    // }
    //
    // async getVideosByPhotographerId(id){
    //     return this.get()
    //     .then(data => data.media
    //         .filter(item => item.photographerId === id && item.hasOwnProperty('video')))
    // }

    async getLikesByPhotographerId(id){
        return this.get()
            .then(data => data.media
                .filter(item => item.photographerId === id)
                .map(item => item.likes)
            );
    }

    async getMediaById(id){
        return this.getById(id, 'media');
    }
}
