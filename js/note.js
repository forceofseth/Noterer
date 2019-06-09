window.onload = function() {
  fillInInformationOnEdit();
  document
    .getElementById("save")
    .addEventListener("click", saveToLocaleStorage);

  document.getElementById("cancel").addEventListener("click", navigateToIndex);
};

function fillInInformationOnEdit() {
  const id = getNoteIdFromParameter();
  if (id) {
    let note = JSON.parse(localStorage.getItem("notes")).filter(
      note => note.id === id
    )[0];
    document.getElementById("details_title").value = note.title;
    document.getElementById("details_description").value = note.description;
    document.getElementById("details_importance").value = note.importance;
    document.getElementById("details_due_date").value = formatDate(
      note.dueDate
    );
    document.getElementById("details_due_date").dataset.finished =
      note.finished;
  }
}

function saveToLocaleStorage() {
  let notes = JSON.parse(localStorage.getItem("notes"));
  if (notes === null) {
    localStorage.setItem("notes", JSON.stringify([]));
    notes = [];
  }
  const importanceOption = document.getElementById("details_importance");
  const note = {
    id: getNoteIdFromParameter() ? getNoteIdFromParameter() : generateUuid(),
    title: document.getElementById("details_title").value,
    description: document.getElementById("details_description").value,
    importance: document.getElementById("details_importance").value,
    importanceData:
      importanceOption.options[importanceOption.selectedIndex].dataset
        .importance,
    dueDate: formatDate(document.getElementById("details_due_date").value),
    finished: getNoteIdFromParameter() ? getFinishStateOnEdit() : false
  };

  pushEditedNoteToNotes(notes, note);
  localStorage.setItem("notes", JSON.stringify(notes));
  navigateToIndex();
}

function navigateToIndex() {
  window.location.href = "index.html";
}

function pushEditedNoteToNotes(notes, note) {
  const index = notes.findIndex(e => e.id === note.id);

  if (index === -1) {
    notes.push(note);
  } else {
    notes[index] = note;
  }
}

function getFinishStateOnEdit() {
  return document.getElementById("details_due_date").dataset.finished == "true";
}

function generateUuid() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

function getNoteIdFromParameter() {
  return new URL(window.location.href).searchParams.get("id");
}

function formatDate(date) {
  return moment(date).format("YYYY-MM-DD");
}
