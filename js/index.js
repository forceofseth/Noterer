function navigateToDetailsPage() {
  window.location.href = "note.html";
}

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
};

function editNote(event) {
  const editButtonId = event.target.dataset.noteId;
  if (editButtonId) {
    window.location.href = "note.html?id=" + editButtonId;
  }
}
