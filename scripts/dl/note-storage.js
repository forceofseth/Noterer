export class NoteStorage {
  constructor() {
    this.notes = JSON.parse(localStorage.getItem("notes"));
    this.filterdNotes;
  }

  getNotes() {
    const localStorageNotes = JSON.parse(localStorage.getItem("notes"));
    if (localStorageNotes === null) {
      this.notes = [];
      this.addNote({
        description: "generated test description",
        dueDate: "2019-06-01",
        finished: false,
        id: "test-id",
        importance: "Low",
        importanceData: "0",
        title: "generated test title"
      });
    } else {
      this.notes = localStorageNotes;
    }
    return this.notes;
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

  getNoteById(id) {
    return this.notes.find(note => note.id === id);
  }

  addNote(note) {
    this.notes.push(note);
    localStorage.setItem("notes", JSON.stringify(this.notes));
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
