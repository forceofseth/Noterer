let notes;
let filteredNotes;
window.onload = function() {
  notes = JSON.parse(localStorage.getItem("notes"));
  renderHandlebars();

  document
    .getElementById("new_note")
    .addEventListener("click", navigateToDetailsPage);

  document.getElementById("notes_wrapper").addEventListener("click", editNote);

  document
    .getElementById("notes_wrapper")
    .addEventListener("change", updateFinishedState);

  document
    .getElementById("finish_date")
    .addEventListener("click", sortNotesByFinishedDate);

  document
    .getElementById("created_date")
    .addEventListener("click", sortNotesByCreatedDate);

  document
    .getElementById("importance")
    .addEventListener("click", sortNoteByImportance);

  document
    .getElementById("show_finished")
    .addEventListener("click", filterFinishedNotes),
    filterFinishedNotes;
};

function renderHandlebars() {
  const noteTemplate = document.getElementById("note_template").innerHTML;
  const context = {
    notes: filteredNotes === undefined ? notes : filteredNotes
  };
  const compiledTemplate = Handlebars.compile(noteTemplate);
  const html = compiledTemplate(context);
  document.getElementById("notes_wrapper").innerHTML = html;
}
function navigateToDetailsPage() {
  window.location.href = "note.html";
}

function editNote(event) {
  const noteId = event.target.parentElement.dataset.noteId;
  if (noteId) {
    window.location.href = "note.html?id=" + noteId;
  }
}
function updateFinishedState(event) {
  const finishedState = event.target.checked ? true : false;
  const noteId = event.target.closest(".note").dataset.noteId;

  const notes = JSON.parse(localStorage.getItem("notes"));
  updateFinishedStateInNotesArray(notes, finishedState, noteId);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function updateFinishedStateInNotesArray(notes, finishedState, noteId) {
  const index = notes.findIndex(e => e.id === noteId);
  if (index === -1) {
    //do nothing
  } else {
    notes[index].finished = finishedState;
  }
}

function sortNotesByFinishedDate() {
  filteredNotes = notes;
  filteredNotes.sort((a, b) => moment(a.dueDate) - moment(b.dueDate));
  renderHandlebars();
}
function sortNotesByCreatedDate() {}
function sortNoteByImportance() {}
function filterFinishedNotes() {}
