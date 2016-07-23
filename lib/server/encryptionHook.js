/**
 * Hooks for a collection, encrypts unencrypted field
 * @param collection Mongo.Collection - collection to hook from
 * @param field String - a field to be decrypted
 */
EncryptionHook = function(collection, field) {
	this.collection = collection;
	this.field = field;
	this.passphrase = Encryption.getPassphrase();
}

EncryptionHook.prototype._beforeInsert = function() {
	var field = this.field;
	var passphrase = this.passphrase;

	this.collection.before.insert(function(userId, doc) {
		var collectionFieldUtil = new CollectionFieldUtil(doc, field);
		
		var docField = collectionFieldUtil.getFieldValue();

		if (docField) {
            var encryptedField = CryptoJS.AES.encrypt(docField, passphrase).toString();

			collectionFieldUtil.setFieldValue(encryptedField, true);

			doc = collectionFieldUtil.getDoc();
	        console.log(doc);
        }
	});
};

EncryptionHook.prototype._beforeUpdate = function() {
	var field = this.field;
	var passphrase = this.passphrase;

	this.collection.before.update(function(userId, doc, fieldNames, modifier, options) {
		var collectionFieldUtil = new CollectionFieldUtil(modifier.$set, field);
		
		var updatedField = collectionFieldUtil.getFieldValue();

	    if (updatedField) {
            var encryptedField = CryptoJS.AES.encrypt(updatedField, passphrase).toString();

			collectionFieldUtil.setFieldValue(encryptedField, true);

			modifier.$set = collectionFieldUtil.getDoc();
			console.log(modifier);
        }
	});
};