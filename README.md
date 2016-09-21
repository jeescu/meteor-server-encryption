# Meteor Server Encryption

Server side collection field encryption using [Crypto AES](https://github.com/p-j/meteor-crypto-aes) and [Collection Hook](https://github.com/matb33/meteor-collection-hooks)

Please refer to [History.md](History.md) for a summary of recent changes.

## Getting Started

Installation:

```
meteor add escu:encryption
```

--------------------------------------------------------------------------------

### Encrypt Collection

Specify your collection and fields to encrypt.

```javascript
var TestCollection = new Mongo.Collection('test');

Meteor.startup(function() {
  if (Meteor.isServer) {
    EncryptCollection(TestCollection, ['field1', 'field2']);
  }
});
```

--------------------------------------------------------------------------------

### Decrypt Collection

Specify your collection and fields to decrypt.

```javascript
Meteor.startup(function() {
  if (Meteor.isClient) {
    DecryptCollection(TestCollection, ['field1', 'field2']);
  }
});
```

--------------------------------------------------------------------------------

### Supports sub fields

Can encrypt/decrypt sub fields up to 4 level.

```javascript
    EncryptCollection(TestCollection, ['field.field', 'field.field.field']);
    DecryptCollection(TestCollection, ['field.field', 'field.field.field']);
```

--------------------------------------------------------------------------------

### Constraints

* Fields with array values not supported.

--------------------------------------------------------------------------------

### Encryption options

#### Passphrase
By default package has its passphrase `littleRabbitJumper123`. I recommend to define your own.

```javascript
Encryption.passphrase('passphrase');
```

__Important__: Should be defined on both server and client.

--------------------------------------------------------------------------------

## Maintainer

- John Edward Escuyos ([jeescu](https://github.com/jeescu))
