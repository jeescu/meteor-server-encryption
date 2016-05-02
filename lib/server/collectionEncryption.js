/**
 * Server side collection encryption, initialize collection fields to be encrypted
 * @param collection Mongo.Collection - collection to be encrypted from
 * @param fields [String] - collection fields to be encrypted
 */
ServerCollectionEncryption = function(collection, fields) {
	this.collection = collection;
	this.fields = fields;
	this._prepare();
}

ServerCollectionEncryption.prototype._prepare = function() {
	for (key in this.fields) {
		this._encrypt(this.fields[key]);
	}
};

ServerCollectionEncryption.prototype._encrypt = function(field) {
	var encrypt = new EncryptionHook(this.collection, field);
	encrypt._beforeInsert();
	encrypt._beforeUpdate();
};