export class NoteDetailController {
  constructor(noteStorage) {
    this.noteStorage = noteStorage;

    this.noteDetailTemplateCompiled = Handlebars.compile(
      document.getElementById("note_detail_template").innerHTML
    );

    this.noteDetailWrapper = document.getElementById("note_detail_wrapper");

    this.isEdit = !!this.getNoteIdFromParameter();
  }

  renderNoteDetail() {
    const note = this.noteStorage.getNoteById(this.getNoteIdFromParameter());
    if (note !== undefined && this.isEdit) {
      note.dueDate = moment(note.dueDate).format("YYYY-MM-DD");
      this.noteDetailWrapper.innerHTML = this.noteDetailTemplateCompiled(note);
      document.getElementById("details_importance").value = note.importance;
    } else {
      this.noteDetailWrapper.innerHTML = this.noteDetailTemplateCompiled({});
    }
  }

  initEventHandlers() {
    document
      .getElementById("note_details")
      .addEventListener("submit", event => {
        event.preventDefault();

        const importanceOption = document.getElementById("details_importance");
        const note = {
          id: this.isEdit ? this.getNoteIdFromParameter() : this.generateUuid(),
          title: document.getElementById("details_title").value,
          description: document.getElementById("details_description").value,
          importance: document.getElementById("details_importance").value,
          importanceData:
            importanceOption.options[importanceOption.selectedIndex].dataset
              .importance,
          dueDate: this.formatDate(
            document.getElementById("details_due_date").value
          ),
          finished: this.isEdit ? this.getFinishState() : false
        };

        this.isEdit
          ? this.noteStorage.updateNote(note)
          : this.noteStorage.addNote(note);

        this.navigateToNoteOverview();
      });

    document
      .getElementById("cancel")
      .addEventListener("click", this.navigateToNoteOverview);
  }

  getNoteIdFromParameter() {
    return new URL(window.location.href).searchParams.get("id");
  }

  navigateToNoteOverview() {
    window.location.href = "index.html";
  }

  getFinishState() {
    return (
      document.getElementById("details_due_date").dataset.finished == "true"
    );
  }

  generateUuid() {
    return (
      "_" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }

  formatDate(date) {
    return moment(date).format("DD.MM.YYYY");
  }

  noteDetailAction() {
    this.renderNoteDetail();
    this.initEventHandlers();
  }
}
