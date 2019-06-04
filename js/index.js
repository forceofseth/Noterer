window.onload = function() {
  const noteTemplate = document.getElementById("note_template").innerHTML;
  const context = { notes: JSON.parse(localStorage.getItem("notes")) };
  const compiledTemplate = Handlebars.compile(noteTemplate);
  const html = compiledTemplate(context);
  document.getElementById("notes_wrapper").innerHTML = html;

  document
    .getElementById("new_note")
    .addEventListener("click", navigateToDetailsPage);

  document.getElementById("notes_wrapper").addEventListener("click", editNote);
  document
    .getElementById("notes_wrapper")
    .addEventListener("change", updateFinishedState);
};
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
