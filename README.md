# Meteor Server Encryption

Server side collection encryption using [Crypto AES](https://github.com/p-j/meteor-crypto-aes) and [Collection Hook](https://github.com/matb33/meteor-collection-hooks)

Please refer to [History.md](History.md) for a summary of recent changes.

## Getting Started

Installation:

```
Not yet published
```

--------------------------------------------------------------------------------

### Encrypt Collection

Specify your collection and fields to encrypt.

```javascript
var TestCollection = new Mongo.Collection('test');

Meteor.startup(function() {
  if (Meteor.isServer) {
    EncryptCollection(TestCollection, ['field1', 'field2'])
  }
});
```

--------------------------------------------------------------------------------

### Decrypt Collection

Specify your collection and fields to decrypt.

```javascript
Meteor.startup(function() {
  if (Meteor.isClient) {
    DecryptCollection(TestCollection, ['field1', 'field2'])
  }
}
```

__Important__: This allows you to choose what collections and fields to decrypt only.

--------------------------------------------------------------------------------

## Important notes

- Since this is server side, db transactions from client is through meteor methods only. 

--------------------------------------------------------------------------------

## Maintainer

- John Edward Escuyos ([jeescu](https://github.com/jeescu))
