const Datastore = require("nedb-promises");

function Note() {}

function NoteStore(db) {
    this.db = db || new Datastore({filename: '../data/notes.db, autoload:true'});
}

function all()
