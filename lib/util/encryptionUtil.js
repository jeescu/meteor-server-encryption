// Utility
SimpleEncryption = function() {
	this.config;
}

SimpleEncryption.prototype.setConfig = function(config) {
	this.config = config;
};

SimpleEncryption.prototype.getPassphrase = function() {
	return 'littleRabbitJumper123'
}

// main encryption instance
Encryption = new SimpleEncryption();

// main config
EncryptionUtils = {
	config: function(config) {
		Encryption.setConfig(config)
	}
}
