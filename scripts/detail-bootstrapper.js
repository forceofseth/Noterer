import { NoteStorage } from "./note-storage.js";
import { NoteDetailController } from "./note-detail-controller.js";
class DetailBootstrapper {
  static start() {
    const noteStorage = new NoteStorage();
    new NoteDetailController(noteStorage).noteDetailAction();
  }
}

document.addEventListener("DOMContentLoaded", DetailBootstrapper.start);
