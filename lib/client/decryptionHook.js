/**
 * Hooks for a collection, decrypts encrypted field
 * @param collection Mongo.Collection - collection to hook from
 * @param fields [String] - initialized encrypted fields to be decrypted
 */
DecryptionHook = function(collection, fields) {
	this.collection = collection;
	this.fields = fields;
	this.passphrase = Encryption.getPassphrase();
}

DecryptionHook.prototype._afterFindOne = function() {
	var passphrase = this.passphrase;
	var fields = this.fields;
	var remainingFields = this.fields.slice();

	this.collection.after.findOne(function(userId, selector, options, doc) {
		var collectionFieldUtil = {};

		if (doc && fields.length > 0) {
			collectionFieldUtil = new CollectionFieldUtil(doc, fields[0]);
		}

		for (key in fields) {
			var field = fields[key];
			collectionFieldUtil.setNewField(field);
			var encryptedField = collectionFieldUtil.getFieldValue();

			if (collectionFieldUtil.isFieldEncrypted()) {
				decryptedField = CryptoJS.AES.decrypt(encryptedField, passphrase).toString(CryptoJS.enc.Utf8);
				
				if (collectionFieldUtil.hasStillFieldWithSameLevel) {
					collectionFieldUtil.setFieldValue(decryptedField, true);
				} else {
					// remove after all fields with same level are already decrypted
					collectionFieldUtil.setFieldValue(decryptedField, false);
				}
			}
    	}

		doc = collectionFieldUtil.getDoc();
	});
};

DecryptionHook.prototype._afterFind = function() {
	var passphrase = this.passphrase;
	var fields = this.fields;
	// var remainingFields = this.fields.slice();

	this.collection.after.find(function(userId, selector, options, cursor) {

		for (key in cursor.collection._docs._map) {
			var doc = cursor.collection._docs._map[key];
			var remainingFields = fields.slice();

			if (doc && fields.length > 0) {
				collectionFieldUtil = new CollectionFieldUtil(doc, fields[0]);
			}

			for (key in fields) {
				var field = fields[key];
				collectionFieldUtil.setNewField(field);
				var encryptedField = collectionFieldUtil.getFieldValue();

				if (collectionFieldUtil.isFieldEncrypted()) {
					decryptedField = CryptoJS.AES.decrypt(encryptedField, passphrase).toString(CryptoJS.enc.Utf8);
					
					if (collectionFieldUtil.hasStillFieldWithSameLevel) {
						collectionFieldUtil.setFieldValue(decryptedField, true);
					} else {
						// remove after all fields with same level are already decrypted
						collectionFieldUtil.setFieldValue(decryptedField, false);
					}
				}
			}

			doc = collectionFieldUtil.getDoc();
		}

	});
};
