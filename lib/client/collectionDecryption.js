/**
 * Client side collection decryption, initialize collection fields to be decrypted
 * @param collection Mongo.Collection - collection to be decrypted from
 * @param fields [String] - collection fields to be decrypted
 */
ClientCollectionDecryption = function(collection, fields) {
	this.collection = collection;
	this.fields = fields;
	this._prepare();
}

ClientCollectionDecryption.prototype._prepare = function() {
	for (field in this.fields) {
		this._decrypt(this.fields[field]);
	}
};

ClientCollectionDecryption.prototype._decrypt = function(field) {
	var decrypt = new DecryptionHook(this.collection, field);
	decrypt._afterFindOne();
	decrypt._afterFind();
};