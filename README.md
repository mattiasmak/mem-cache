## Description

I minimalistic and simple in-memory cache. Work pretty much like other similar solutions but with one difference. Instead of binding a seperate Timeout to each cached value, mem-caches handles invalidation of the cache in one place.

## Todo

This is just a draft/poc.

## Usage

```javascript
var cache = require('mem-cache');

// Now cache and get a key

cache.put('hello', 'world');
console.log(cache.get('hello'));

// Setting a ttl and a callback on the key

cache.put('hello', 'world', 100, function(key, value) {
    console.log('Removed');
});
```
