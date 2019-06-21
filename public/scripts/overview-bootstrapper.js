import { NoteStorage } from "./dl/note-storage.js";
import { NoteOverviewController } from "./ui/note-overview-controller.js";
class OverviewBootstrapper {
  static start() {
    const noteStorage = new NoteStorage();
    new NoteOverviewController(noteStorage).noteAction();
  }
}

document.addEventListener("DOMContentLoaded", OverviewBootstrapper.start);
