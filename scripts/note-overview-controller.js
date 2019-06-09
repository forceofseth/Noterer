export class NoteOverviewController {
  constructor(noteStorage) {
    this.noteStorage = noteStorage;

    this.noteTemplateCompiled = Handlebars.compile(
      document.getElementById("note_template").innerHTML
    );

    this.newNoteButton = document.getElementById("new_note");
    this.finishDateButton = document.getElementById("finish_date");
    this.importanceButton = document.getElementById("importance");
    this.hideFinishedButton = document.getElementById("hide_finished");
    this.clearFilterButton = document.getElementById("clear_filter");
    this.notesWrapper = document.getElementById("notes_wrapper");
    this.styleSelector = document.getElementById("style_selector");
  }

  renderNotes(notes) {
    this.notesWrapper.innerHTML = this.noteTemplateCompiled({
      notes: notes
    });
  }
  initEventHandlers() {
    this.newNoteButton.addEventListener(
      "click",
      () => (window.location.href = "note_detail.html")
    );

    this.finishDateButton.addEventListener(
      "click",
      this.sortNotesByFinishedDate
    );

    this.importanceButton.addEventListener("click", this.sortNoteByImportance);

    this.hideFinishedButton.addEventListener("click", this.filterFinishedNotes);

    this.clearFilterButton.addEventListener("click", this.clearFilter);

    this.notesWrapper.addEventListener("click", this.editNote);

    this.notesWrapper.addEventListener("change", this.updateFinishedState);

    this.styleSelector.addEventListener("change", event =>
      this.changeStyle(event.target.value)
    );
  }

  sortNotesByFinishedDate() {
    const notes = this.noteStorage.getNotesOrderByFinishDate();
    this.renderNotes(notes);
  }

  sortNoteByImportance() {
    const notes = this.noteStorage.getNotesOrderByImportance();
    this.renderNotes(notes);
  }

  filterFinishedNotes() {
    const notes = this.noteStorage.getNotesFilterFinished();
    this.renderNotes(notes);
  }

  clearFilter() {
    const notes = this.noteStorage.getNotes();
    this.renderNotes(notes);
  }

  editNote(event) {
    if (event.target.className === "edit") {
      const noteId = event.target.parentElement.dataset.noteId;
      if (noteId) {
        window.location.href = "note_detail.html?id=" + noteId;
      }
    }
  }

  updateFinishedState(event) {
    const noteId = event.target.closest(".note").dataset.noteId;
    const note = this.noteStorage.getNoteById(noteId);
    note.finished = event.target.checked ? true : false;
    this.noteStorage.updateNote(note);
  }

  changeStyle(style) {
    document
      .getElementById("style_css")
      .setAttribute("href", "./stylesheets/" + style + ".css");
  }

  noteAction() {
    this.changeStyle(document.getElementById("style_selector").value);
    this.renderNotes(this.noteStorage.getNotes());
    this.initEventHandlers();
  }
}
