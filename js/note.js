function saveToLocaleStorage() {
  const notes = JSON.parse(localStorage.getItem("notes"));
  const note = {
    title: document.getElementById("details_title").value,
    description: document.getElementById("details_description").value,
    importance: document.getElementById("details_importance").value,
    dueDate: document.getElementById("details_due_date").value
  };
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}
