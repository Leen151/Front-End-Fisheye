class MediasFactory {
	// 2 attributs
	// data : données retournées par le json
	// type : source des données (photo ou vidéo)
	constructor(data, type, photographerName) {
		if (type === "photo") {
			return new Photo(data, photographerName);
		} else if (type === "video") {
			return new Video(data, photographerName);
		} else {
			throw "Unknown type format";
		}
	}
}