/**
 * Client side collection decryption, initialize collection fields to be decrypted
 * @param collection Mongo.Collection - collection to be decrypted from
 * @param fields [String] - collection fields to be decrypted
 */
ClientCollectionDecryption = function(collection, fields) {
	this.collection = collection;
	this.fields = fields;
}

ClientCollectionDecryption.prototype.prepare = function() {
	this._decrypt(this.fields);
};

ClientCollectionDecryption.prototype._decrypt = function(fields) {
	var decrypt = new DecryptionHook(this.collection, fields);
	decrypt._afterFindOne();
	decrypt._afterFind();
};