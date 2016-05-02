export const name = 'encryption';
/**
 * Initialize collection fields to be ready on encryption and decryption process
 * @param collection Mongo.Collection - collection instance
 * @param fields [String] - specified fields to this collection to be encrypted
 * @param options Object - optional
 */
EncryptCollection = function(collection, fields, options) {
	this.options = options || {};

	try {
		var collectionEncryption = new ServerCollectionEncryption(collection, fields);
	} catch (e) {
		console.log(e);
	} 
}

DecryptCollection = function(collection, fields, options) {
	this.options = options || {};

	try {
		var collectionDecryption = new ClientCollectionDecryption(collection, fields);
	} catch (e) {
		console.log(e);
	} 
}

