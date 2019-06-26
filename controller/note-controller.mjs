import {noteStore} from '../services/note-store.mjs';

export class NoteController {

    async getNotes(req, res) {
        res.json((await noteStore.all() || []))
    };

    async createNote(req, res) {
        res.json(await noteStore.add(req.body));
    };

    async getNote(req, res) {
        res.json(await noteStore.get(req.params.id));
    };

    async updateNote(req, res){
        res.json(await noteStore.update(req.body));
    }
}

export const noteController = new NoteController();