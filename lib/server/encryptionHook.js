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
		if (doc[field]) {
            var updatedField = doc[field];
            var encryptedField = CryptoJS.AES.encrypt(updatedField, passphrase).toString();

            doc[field] = encryptedField;
            doc['_encrypted'] = true;
	        console.log(doc)
        }
	});
};

EncryptionHook.prototype._beforeUpdate = function() {
	var field = this.field;
	var passphrase = this.passphrase;

	this.collection.before.update(function(userId, doc, fieldNames, modifier, options) {
	    if (modifier.$set[field]) {
            var updatedField = modifier.$set[field];
            var encryptedField = CryptoJS.AES.encrypt(updatedField, passphrase).toString();

            modifier.$set[field] = encryptedField;
            modifier.$set['_encrypted'] = true;
        }
	});
};