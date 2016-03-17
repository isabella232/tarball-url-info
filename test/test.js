var test = require('tape')
var tarUrls = require('../')

test('creates info from scoped tar', function (t) {
  var scopedTar = 'https://registrytwo.npmjs.com/@soldair/hi/-/hi-1.0.0.tgz'

  var info = tarUrls(scopedTar)

  console.log('info', info)

  t.ok(info.scoped, 'this is a scoped module')
  t.ok(info.couchName === '@soldair%2fhi', 'the couch name should be set and it should be appropriatly url encoded')
  t.ok(info.file === 'hi-1.0.0.tgz', 'the file name should be the base name even if scoped')
  t.ok(info.name === '@soldair/hi', 'the name should be correct')
  t.ok(info.path === '/@/@soldair/hi/_attachments/hi-1.0.0.tgz', 'the tarball path should be correct')
  t.ok(info.externalPath === '/@soldair/hi/-/hi-1.0.0.tgz', 'the external path should be correct even if scoped')

  t.end()
})

test('createsinto from regular tar', function (t) {
  var tar = 'https://registrytwo.npmjs.com/hi/-/hi-1.0.0.tgz'

  var info = tarUrls(tar)

  console.log(info)

  t.ok(!info.scoped, 'this is NOT a scoped module')
  t.ok(info.couchName === 'hi', 'the couch name should be set to the name')
  t.ok(info.file === 'hi-1.0.0.tgz', 'the file name should be the base name')
  t.ok(info.name === 'hi', 'the name should be correct')
  t.ok(info.path === '/h/hi/_attachments/hi-1.0.0.tgz', 'the tarball path should be correct')
  t.ok(info.externalPath === '/hi/-/hi-1.0.0.tgz', 'the external path should be correct')

  t.end()
})

test('returns false if tarUrl is undefined', function (t) {
  var info = tarUrls()
  t.ok(info === false, 'should be false if undefined tarUrl')
  t.end()
})

test('returns false if tarUrl doesnt end with .tgz', function (t) {
  var info = tarUrls('foo')
  t.ok(info === false, 'should be false')
  t.end()
})

test('returns false if tarUrl doesnt have version', function (t) {
  var info = tarUrls('foo.tgz')
  t.ok(info === false, 'should be false')
  t.end()
})

test('works if tar version has many numbers', function (t) {
  var info = tarUrls('http://registry.npmjs.org/esprima-fb/-/esprima-fb-3001.0001.0000-dev-harmony-fb.tgz')
  t.ok(info.version === '3001.1.0-dev-harmony-fb', 'should return and parse correct version.')
  t.end()
})
