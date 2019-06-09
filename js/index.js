let notes;
let filteredNotes;
window.onload = function() {
  loadNotesFromLocalStorage();
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
    .getElementById("importance")
    .addEventListener("click", sortNoteByImportance);

  document
    .getElementById("hide_finished")
    .addEventListener("click", filterFinishedNotes);

  document
    .getElementById("clear_filter")
    .addEventListener("click", clearFilter);
};

function loadNotesFromLocalStorage() {
  notes = JSON.parse(localStorage.getItem("notes"));
}

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
  if (event.target.className === "edit") {
    const noteId = event.target.parentElement.dataset.noteId;
    if (noteId) {
      window.location.href = "note.html?id=" + noteId;
    }
  }
}
function updateFinishedState(event) {
  const finishedState = event.target.checked ? true : false;
  const noteId = event.target.closest(".note").dataset.noteId;

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
  loadNotesFromLocalStorage();
  filteredNotes = notes;
  filteredNotes.sort((a, b) => moment(a.dueDate) - moment(b.dueDate));
  renderHandlebars();
}
function sortNoteByImportance() {
  loadNotesFromLocalStorage();
  filteredNotes = notes;
  filteredNotes.sort(
    (a, b) => Number(b.importanceData) - Number(a.importanceData)
  );
  renderHandlebars();
}
function filterFinishedNotes() {
  loadNotesFromLocalStorage();
  filteredNotes = notes;
  filteredNotes = filteredNotes.filter(note => {
    return note.finished === false;
  });
  renderHandlebars();
}

function clearFilter() {
  loadNotesFromLocalStorage();
  filteredNotes = notes;
  renderHandlebars();
}
