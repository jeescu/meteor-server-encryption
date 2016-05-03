/**
 * A collection field handler, convert string fields to property access code
 * @param doc Object - document queriedfrom a collection
 */
CollectionFieldUtil = function(doc) {
	this.doc = doc;
}

/**
 * Converts field into object property access
 * @param field String - single string field or a dot separated field for sub
 */
CollectionFieldUtil.prototype.getSubProperty = function(field) {

}

CollectionFieldUtil.prototype.getDoc = function() {
	return this.doc;
}

CollectionFieldUtil.prototype.firstLevelSubProperty = function(field) {

}

CollectionFieldUtil.prototype.secondLevelSubProperty = function(field) {

}

CollectionFieldUtil.prototype.thirdLevelSubProperty = function(field) {

}

CollectionFieldUtil.prototype.fourthLevelSubProperty = function(field) {

}