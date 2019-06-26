import {httpService} from "./http-service.js";

export class NoteStorage {

   constructor(){
    this.init();
  }

  async init(){
    this.notes = await this.getAllNotes();
  }

  async getAllNotes() {
    return await httpService.ajax("GET","/notes/", undefined);
  }

  async getNotesOrderByFinishDate() {
    const sortedNotes = [... this.notes];
    return sortedNotes.sort(
      (a, b) => moment(a.dueDate) - moment(b.dueDate)
    );
  }

  getNotesOrderByImportance() {
    const sortedNotes = [...this.notes];
    return sortedNotes.sort(
      (a, b) => Number(b.importanceData) - Number(a.importanceData)
    );
  }

  getNotesFilterFinished() {
    const filteredNotes = [...this.notes];
    return filteredNotes.filter(note => note.finished === false);
  }

  async getNoteById(id) {
    return await httpService.ajax("GET", `/notes/${id}`, undefined);
  }

  async addNote(note) {
     await httpService.ajax("POST", "/notes/", note);
     return this.notes =[... await this.getAllNotes()];
  }

  async updateNote(note) {
     await httpService.ajax("PUT", "/notes/", note)
    return this.notes =[... await this.getAllNotes()];
  }
}
