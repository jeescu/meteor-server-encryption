export const name = 'encryption';
/**
 * Initialize collection fields to be ready on encryption and decryption process
 * @param collection Mongo.Collection - collection instance
 * @param fields [String] - specified fields to this collection to be encrypted
 * @param options Object - optional (no use for now)
 */
// @TODO: encrypt/decrypt absolute path fields up to 3 level.
EncryptCollection = function(collection, fields, options) {
	this.options = options || {};

	try {
		var collectionEncryption = new ServerCollectionEncryption(collection, fields);
		collectionEncryption.prepare();
	} catch (e) {
		console.log(e);
	} 
}

DecryptCollection = function(collection, fields, options) {
	this.options = options || {};

	try {
		var collectionDecryption = new ClientCollectionDecryption(collection, fields);
		collectionDecryption.prepare();
	} catch (e) {
		console.log(e);
	} 
}

