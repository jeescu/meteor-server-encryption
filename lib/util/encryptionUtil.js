/**
 * Package's encryption wrapper util
 */
SimpleEncryption = function() {
	this.passphrase = 'littleRabbitJumper123';
	this.config;
}
/**
 * passphrase set from EncryptionUtils
 * @param { passphrase } string
 */
SimpleEncryption.prototype.setPassphrase = function(passphrase) {
	this.passphrase = passphrase;
};
/**
 * optional config if we can add some
 * @param { config } object (no use for now)
 */
SimpleEncryption.prototype.setConfig = function(config) {
	this.config = config;
};

SimpleEncryption.prototype.getPassphrase = function() {
	return this.passphrase;
}

/**
 * Package's encryption instance
 */
Encryption = new SimpleEncryption();

/**
 * Accessible by the app, act as the bridge to package encryption instance
 */
EncryptionUtils = {
	config: function(config) {
		Encryption.setConfig(config)
	},

	passphrase: function(passphrase) {
		Encryption.setPassphrase(passphrase)
	}
}
