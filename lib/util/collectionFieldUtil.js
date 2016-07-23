/**
 * A collection field handler, convert string fields to property access code
 * @param doc Object - document queried from a collection
 * @param field string - encrypted field
 */
CollectionFieldUtil = function(doc, field) {
	// class constructor variables
	this.doc = doc;
	this.field = field;

	// instace variables
	this.fieldValue;
	this.isEncrypted = false;

	// init method
	this._prepareFieldValue()	
}

/**
 * Converts string field into object property access and gets the value
 * @param field String - single string field or a dot separated field for sub
 */
CollectionFieldUtil.prototype._prepareFieldValue = function() {
	var subFields = this.field.split('.');

	try {
		switch(subFields.length) {
			case 1:
				this.fieldValue = this.doc[subFields[0]];
				this.isEncrypted = this.doc['_encrypted'];
				break;

			case 2:
				this.fieldValue = this.doc[subFields[0]][subFields[1]];
				this.isEncrypted = this.doc[subFields[0]]._encrypted;
				break;

			case 3:
				this.fieldValue = this.doc[subFields[0]][subFields[1]][subFields[2]];
				this.isEncrypted = this.doc[subFields[0]][subFields[1]]._encrypted;
				break;

			case 4:
				this.fieldValue = this.doc[subFields[0]][subFields[1]][subFields[2]][subFields[3]];
				this.isEncrypted = this.doc[subFields[0]][subFields[1]][subFields[2]]._encrypted;
				break;

			default:
				throw new Error('Level 5 sub field not supported');
		}

	} catch (error) {
		console.error(error);
	}
}
/**
 * Assign new value to this field and set whether this is encrypted or not.
 * @param { value } string - new decrypted or encrypted value of the field
 * @param { isEncrypted } boolean - add field `_encrypted` if this will save to db,
 * otherwise delete `_encrypted` field if will be viewed on client
 */
CollectionFieldUtil.prototype.setFieldValue = function(value, isEncrypted) {
	var subFields = this.field.split('.');

	try {

		switch(subFields.length) {
			case 1:
				this.doc[subFields[0]] = value;

				isEncrypted ? 
					this.doc._encrypted = true :
					delete this.doc._encrypted;

				break;

			case 2:
				this.doc[subFields[0]][subFields[1]] = value;

				isEncrypted ?
					this.doc[subFields[0]]._encrypted = true :
					delete this.doc[subFields[0]]._encrypted;

				break;

			case 3:
				this.doc[subFields[0]][subFields[1]][subFields[2]] = value;

				isEncrypted ?
					this.doc[subFields[0]][subFields[1]]._encrypted = true :
					delete this.doc[subFields[0]][subFields[1]]._encrypted;

				break;

			case 4:
				this.doc[subFields[0]][subFields[1]][subFields[2]][subFields[3]] = value;

				isEncrypted ?
					this.doc[subFields[0]][subFields[1]][subFields[2]]._encrypted = true :
					delete this.doc[subFields[0]][subFields[1]][subFields[2]]._encrypted;

				break;

			default:
				throw new Error('Level 5 sub field not supported');
		}

	} catch(error) {
		console.error(error);
	}
}

CollectionFieldUtil.prototype.hasStillFieldWithSameLevel = function(fields, field) {
	var index = fields.indexOf(field);

	if (index != -1) {
		fields.splice(index, 1);
	}
	
	var hasStillFieldWithSameLevel = fields.filter(function(remainingField) {
		var remainingFieldLen = remainingField.split('.').length;
		var currentFieldLen = field.split('.').length;

		return remainingFieldLen == currentFieldLen;
	});

	return hasStillFieldWithSameLevel.length != 0;
}

CollectionFieldUtil.prototype.setNewField = function(field) {
	this.field = field;
	this._prepareFieldValue();
}

CollectionFieldUtil.prototype.getFieldValue = function() {
	return this.fieldValue;
}

CollectionFieldUtil.prototype.isFieldEncrypted = function() {
	return this.isEncrypted;
}

CollectionFieldUtil.prototype.getDoc = function() {
	return this.doc;
}