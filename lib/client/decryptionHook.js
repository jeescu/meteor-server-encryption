/**
 * Hooks for a collection, decrypts encrypted field
 * @param collection Mongo.Collection - collection to hook from
 * @param field String - an initialized encrypted field to be decrypted
 */
DecryptionHook = function(collection, field) {
	this.collection = collection;
	this.field = field;
	this.passphrase = Encryption.getPassphrase();
}

DecryptionHook.prototype._afterFindOne = function() {
	var passphrase = this.passphrase;
	var field = this.field;

	this.collection.after.findOne(function(userId, selector, options, doc) {
		if (doc && doc[field] && doc._encrypted) {
    		var encryptedField = doc[field];
            doc[field] = CryptoJS.AES.decrypt(encryptedField, passphrase).toString(CryptoJS.enc.Utf8);
            delete doc['_encrypted'];
        }
	});
};

DecryptionHook.prototype._afterFind = function() {
	var passphrase = this.passphrase;
	var field = this.field;

	this.collection.after.find(function(userId, selector, options, cursor) {

		for (key in cursor.collection._docs._map) {
			var doc = cursor.collection._docs._map[key];

			if (doc && doc[field] && doc._encrypted) {
	    		var encryptedField = doc[field];
	            doc[field] = CryptoJS.AES.decrypt(encryptedField, passphrase).toString(CryptoJS.enc.Utf8);
	            delete doc['_encrypted'];
	        }
		}
	});
};
