#!/usr/bin/env node

var recover = require('.')
var couch = process.argv[2]
var id = process.argv[3]

if (!couch || !id) usage()

recover(couch, id, function (err, doc) {
  if (err) return console.log("ERROR: ", err)
  console.log(JSON.stringify(doc))
})





  function usage() {
    console.log('usage example:')
    console.log('recover-couch-doc http://localhost:5984/stuff 12032')
    process.exit(0)
  }
