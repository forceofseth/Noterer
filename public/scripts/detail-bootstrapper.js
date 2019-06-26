import { NoteStorage } from "./dl/note-storage.js";
import { NoteDetailController } from "./ui/note-detail-controller.js";
class DetailBootstrapper {
   static async start() {
    const noteStorage = new NoteStorage();
    await new NoteDetailController(noteStorage).noteDetailAction();
  }
}

document.addEventListener("DOMContentLoaded", DetailBootstrapper.start);
