function saveToLocaleStorage() {
  let notes = JSON.parse(localStorage.getItem("notes"));
  if (notes === null) {
    localStorage.setItem("notes", JSON.stringify([]));
    notes = [];
  }
  const uuid = getNoteIdFromParameter()
    ? getNoteIdFromParameter()
    : generateUuid();
  const finished_state = getNoteIdFromParameter()
    ? getFinishStateOnEdit()
    : false;
  const note = {
    id: uuid,
    title: document.getElementById("details_title").value,
    description: document.getElementById("details_description").value,
    importance: document.getElementById("details_importance").innerHTML,
    dueDate: document.getElementById("details_due_date").value,
    finished: finished_state
  };

  pushToArray(notes, note);
  localStorage.setItem("notes", JSON.stringify(notes));
  navigateToIndex();
}

function pushToArray(arr, obj) {
  const index = arr.findIndex(e => e.id === obj.id);

  if (index === -1) {
    arr.push(obj);
  } else {
    arr[index] = obj;
  }
}

function getFinishStateOnEdit() {
  const id = getNoteIdFromParameter();
}

function generateUuid() {
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}

window.onload = function() {
  fillInInformationOnEdit();
  document
    .getElementById("save")
    .addEventListener("click", saveToLocaleStorage);

  document.getElementById("cancel").addEventListener("click", navigateToIndex);
};

function navigateToIndex() {
  window.location.href = "index.html";
}

function fillInInformationOnEdit() {
  const id = getNoteIdFromParameter();
  if (id) {
    let note = JSON.parse(localStorage.getItem("notes")).filter(
      note => note.id === id
    );
    document.getElementById("details_title").value = note[0].title;
    document.getElementById("details_description").value = note[0].description;
    document.getElementById("details_importance").innerHTML =
      note[0].importance;
    document.getElementById("details_due_date").value = note[0].dueDate;
    document.getElementById("details_due_date").dataset.finished =
      note[0].finished;
  }
}

function getNoteIdFromParameter() {
  return new URL(window.location.href).searchParams.get("id");
}
