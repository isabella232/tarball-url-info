var url = require('url')
var semver = require('semver')

// take any path that ends in the package .tgz name and return it's data

module.exports = function (tarUrl) {
  var tarPath
  try {
    tarPath = url.parse(tarUrl).path + ''
  } catch (e) {
    return false
  }

  // unserialize any %40 %2f
  tarPath = decodeURIComponent(tarPath)

  var parts = tarPath.split(/[\/]+/)
  var file = parts.pop()

  if (file.indexOf('.tgz') !== file.length - 4) return false

  var prefix = ''
  var scope

  for (var i = 0; i < parts.length; ++i) {
    scope = parts[i]
    if (scope[0] === '@') {
      prefix = scope + '/'
      break
    }
  }

  parts = file.split(/-([\d]+\.[\d]+\.[\d]+)/)
  // 'aaa-1.0.1-foo.tgz'.split(/-v([\d+]\.[\d+]\.[\d+])/)
  // [ 'aaa', '1.0.1', '-foo.tgz' ]

  if (parts.length !== 3) return false

  var name = prefix + parts[0]

  var version = parts[1]

  var patch = parts[2].replace(/\.tgz$/, '')
  version += patch

  var scoped = !!prefix.length

  return {
    file: file,
    name: name,
    scoped: scoped,
    version: semver.clean(version, true),
    path: '/' + name[0] + '/' + name + '/_attachments/' + file,
    externalPath: '/' + name + '/-/' + file,
    couchName: name.replace(/[\/]+/g, '%2f')
  }
}
