var request = require('request')

module.exports = function (couch, id, cb) {
  // we need the prev doc. hack attack
  request({url: couch + '/' + id + '?revs=true&open_revs=all'}, function (err, resp, body) {
    if (err) return cb(err)

    // total hacky
    // the prev url returns a mess chunked mime type sections
    var _json
    try {
      _json = JSON.parse(body.split('\n')[3])
    } catch (e) {
      return cb(new Error('could not parse revisions of document'))
    }
    if (!_json._revisions || !_json._revisions.start || !_json._revisions.ids) {
      return cb(new Error('strange response from couch'))
    }
    var _rev = (_json._revisions.start - 1) + '-' + _json._revisions.ids[1]
    var _opts = {
      url: couch + '/' + id,
      qs: {
        rev: _rev
      },
      json: true
    }
    request(_opts, function (err, resp, _prev_doc) {
      cb(err, _prev_doc)
    })
  })
}
