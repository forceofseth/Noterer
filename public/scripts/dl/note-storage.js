import {httpService} from "./http-service.js";

export class NoteStorage {
  constructor() {
    this.notes = JSON.parse(localStorage.getItem("notes"));
  }

  async getAllNotes() {
    return await httpService.ajax("GET","/notes/", undefined);
  }

  getNotesOrderByFinishDate() {
    this.filteredNotes = [...this.notes];
    return this.filteredNotes.sort(
      (a, b) => moment(a.dueDate) - moment(b.dueDate)
    );
  }

  getNotesOrderByImportance() {
    this.filteredNotes = [...this.notes];
    return this.filteredNotes.sort(
      (a, b) => Number(b.importanceData) - Number(a.importanceData)
    );
  }

  getNotesFilterFinished() {
    this.filteredNotes = [...this.notes];
    return this.filteredNotes.filter(note => note.finished === false);
  }

  async getNoteById(id) {
    return await httpService.ajax("GET", `/notes/${id}`, undefined);
  }

  async addNote(note) {
    return await httpService.ajax("POST", "/notes/", note);
  }

  updateNote(note) {
    const index = this.notes.findIndex(e => e.id === note.id);
    if (index === -1) {
      //do nothing
    } else {
      this.notes[index] = note;
      localStorage.setItem("notes", JSON.stringify(this.notes));
    }
  }
}
