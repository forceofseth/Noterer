export class NoteDetailController {

  constructor(noteStorage) {
    this.noteStorage = noteStorage;

    this.noteDetailTemplateCompiled = Handlebars.compile(
      document.getElementById("note_detail_template").innerHTML
    );

    this.noteDetailWrapper = document.getElementById("note_detail_wrapper");

    this.isEdit = !!this.getNoteIdFromParameter();
  }

  async renderNoteDetail() {
    const note = await this.noteStorage.getNoteById(this.getNoteIdFromParameter());
    if (note !== null && this.isEdit) {
      note.dueDate = moment(note.dueDate,"DD.MM.YYYY").format("YYYY-MM-DD");
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

        if(this.isEdit){
          note._id = this.getNoteIdFromParameter();
        }

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
    window.location.href = "../html/index.html";
  }

  getFinishState() {
    return (
      document.getElementById("details_due_date").dataset.finished === "true"
    );
  }

  formatDate(date) {
    return moment(date).format("DD.MM.YYYY");
  }

  async noteDetailAction() {
    await this.renderNoteDetail();
    this.initEventHandlers();
  }
}
