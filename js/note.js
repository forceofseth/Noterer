function saveToLocaleStorage() {
  let notes = JSON.parse(localStorage.getItem("notes"));
  if (notes === null) {
    localStorage.setItem("notes", JSON.stringify([]));
    notes = [];
  }
  const note = {
    title: document.getElementById("details_title").value,
    description: document.getElementById("details_description").value,
    importance: document.getElementById("details_importance").innerHTML,
    dueDate: document.getElementById("details_due_date").value
  };
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  navigateToIndex();
}

function navigateToIndex() {
  window.location.href = "index.html";
}
