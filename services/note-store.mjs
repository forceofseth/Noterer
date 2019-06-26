import Datastore from "nedb-promise";

export class Note{
    constructor(note){
        this.description = note.description;
        this.dueDate = note.dueDate;
        this.finished = note.finished;
        this.id = note.id;
        this.importance = note.importance;
        this.importanceData = note.importanceData;
        this.title = note.title;
    }
}

export class NoteStore{
    constructor(db){
        this.db = db || new Datastore({filename: "./data/notes.db", autoload:true});

    }

    async add(note){
        let newNote = new Note(note)
        return await this.db.insert(newNote);
    }

    async get(id){
        return await this.db.findOne({_id:id});
    }

    async update(note){
        await this.db.update({_id:note._id},{$set:note});
        return await this.get(note.id);
    }

    async all(){
        return await this.db.cfind({}).sort({dueDate: -1}).exec();
    }
}

export const noteStore = new NoteStore();