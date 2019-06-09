export class NoteDetailController {
  constructor(noteStorage) {
    this.noteStorage = noteStorage;
    this.noteDetailTemplateCompiled = Handlebars.compile(
      document.getElementById("note_detail_template").innerHTML
    );
    this.noteDetailWrapper = document.getElementById("note_detail_wrapper");
  }

  renderNoteDetail() {
    const note = this.noteStorage.getNoteById(this.getNoteIdFromParameter());
    if (note !== undefined) {
      this.noteDetailWrapper.innerHTML = this.noteDetailTemplateCompiled(note);
      //TODO ASSIGN OPTION OF SELECT
    } else {
      this.noteDetailWrapper.innerHTML = this.noteDetailTemplateCompiled({});
    }
  }

  initEventHandlers() {
    //TODO refactor get noteIdFromParameter into proper methods
    document
      .getElementById("note_details")
      .addEventListener("submit", event => {
        if (event.target.value) event.preventDefault();
        const importanceOption = document.getElementById("details_importance");
        const note = {
          id: this.getNoteIdFromParameter()
            ? this.getNoteIdFromParameter()
            : this.generateUuid(),
          title: document.getElementById("details_title").value,
          description: document.getElementById("details_description").value,
          importance: document.getElementById("details_importance").value,
          importanceData:
            importanceOption.options[importanceOption.selectedIndex].dataset
              .importance,
          dueDate: this.formatDate(
            document.getElementById("details_due_date").value
          ),
          finished: this.getNoteIdFromParameter()
            ? this.getFinishState()
            : false
        };
        if (this.getNoteIdFromParameter() === null) {
          this.noteStorage.addNote(note);
        } else {
          this.noteStorage.updateNote(note);
        }
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
    window.location.href = "note_overview.html";
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
    return moment(date).format("YYYY-MM-DD");
  }

  noteDetailAction() {
    this.renderNoteDetail();
    this.initEventHandlers();
  }
}
