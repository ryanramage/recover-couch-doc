# recover-couch-doc

Given a deleted document id, it will attempt to get the last rev before deletion. 


### warning 

Please note, couchdb is not a revision control db, so this is not guaranteed to work. 
If this db has been compacted, or replicated, chances are the prev revision is not around anymore.


## Usage


### As a module

    npm i recover-couch-doc

```
var recover = require('recover-couch-doc')
recover('http://localhost:5984/stuff', 'E327293', function(err, doc) {
  
})
```


### cmd line

    npm i -g recover-couch-doc
    recover-couch-doc http://localhost:5984/stuff E327293


## License

MIT
