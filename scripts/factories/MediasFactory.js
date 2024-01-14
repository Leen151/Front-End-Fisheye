class MediasFactory {
	// 2 attributs
	// data : données retournées par le json
	// type : source des données (photo ou vidéo)
	constructor(data, type) {
		if (type === 'photo') {
			return new Photo(data)
		} else if (type === 'video') {
			return new Video(data)
		} else {
			throw 'Unknown type format'
		}
	}
}