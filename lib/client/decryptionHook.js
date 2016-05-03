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

	this.collection.after.findOne(function(userId, selector, options, doc) {

		for (key in fields) {
			var field = fields[key];
			
			if (doc && doc[field] && doc._encrypted) {
	    		var encryptedField = doc[field];
	            doc[field] = CryptoJS.AES.decrypt(encryptedField, passphrase).toString(CryptoJS.enc.Utf8);
	        }

	        if (fields.length == (key + 1)) {
	            delete doc['_encrypted'];
	        }
    	}
	});
};

DecryptionHook.prototype._afterFind = function() {
	var passphrase = this.passphrase;
	var fields = this.fields;

	this.collection.after.find(function(userId, selector, options, cursor) {

		for (key in cursor.collection._docs._map) {
			var doc = cursor.collection._docs._map[key];

			for (key in fields) {
				var field = fields[key];

				if (doc && doc[field] && doc._encrypted) {
		    		var encryptedField = doc[field];
		            doc[field] = CryptoJS.AES.decrypt(encryptedField, passphrase).toString(CryptoJS.enc.Utf8);
		        }

		        if (fields.length == (parseInt(key) + 1)) {
	            	delete doc['_encrypted'];
	        	}
		    }
		}
	});
};
