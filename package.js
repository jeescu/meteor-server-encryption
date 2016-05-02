Package.describe({
  name: 'escu:encryption',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Simple server side data encryption using AES and Collection Hook packages',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.2.4');
  api.use('ecmascript');
  api.use('jparker:crypto-aes');
  api.use('matb33:collection-hooks');
  api.mainModule('encryption.js');

  api.addFiles(['lib/client/collectionDecryption.js', 'lib/client/decryptionHook.js', 'lib/encryptionUtil.js'], 'client');
  api.addFiles(['lib/server/collectionEncryption.js', 'lib/server/encryptionHook.js', 'lib/encryptionUtil.js'], 'server');

  api.export('EncryptCollection', 'server');
  api.export('DecryptCollection', 'client');

  api.export('EncryptionUtils', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('escu:encryption');
  api.mainModule('encryption-tests.js');
});
