class MediasFactory {
	/**
	 * @param data - données retournées par le json
	 * @param type - type du media (photo ou video)
	 * @param photographerName - nécessaire aux constructeurs
	 */
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