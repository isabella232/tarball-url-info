# tarball-url-info

take a tarball url and return an object with tarball path, version, etc

you get tarball urls from package metadata. `curl https://registry.npmjs.org/lodash`
the `obj.versions[version here].dist.tarball` contains the tarball url.

if you find yourself with only a tarball url this library is for you.


```
var tarUrls = require('./')
var obj = ('http://registry.npmjs.org/lodash/-/lodash-4.5.0.tgz')
console.log(obj)
```

will output

```
{ file: 'lodash-4.5.0.tgz',
  name: 'lodash',
  scoped: false,
  version: '4.5.0',
  path: '/l/lodash/_attachments/lodash-4.5.0.tgz',
  externalPath: '/lodash/-/lodash-4.5.0.tgz',
  couchName: 'lodash' }
```


notes
-----

- tarball file name versions may not have clean semver. this takes care of cleaning the value for the version field.
