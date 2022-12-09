import { callFetchCreateUI } from "./fetch.js";
import { languageSwitcher } from "./language-switcher.js";
import { timeoutModalInitFns } from "./idle-timer-tier-2-timeout-modal.js";
import { interactionEvents } from "./interaction-events.js";
import { attractView } from "./attract-view.js";
import { introView } from "./intro-view.js";
import { mainVideoView } from "./main-video-view.js";
import { formView } from "./handle-form-input.js";
import { formConfirmationModal } from "./form-confirmation-modal.js";
import { formSubmissionModal } from "./form-submission-modal.js";
import { simpleKeyboard } from "./simple-keyboard.js";

window.addEventListener("load", () => {
  /******************************
   * UI + Langauge
   ******************************/
  callFetchCreateUI();
  languageSwitcher.init();

  // Determine if there was a language previously set
  if (localStorage.getItem("langState")) {
    languageSwitcher.setLanguage(localStorage.getItem("langState"));
  }

  // Apply the language specified in current "langState"
  languageSwitcher.applyLanguage(languageSwitcher.lang.langState);

  // Virtual keyboard must be initialized to set its initial regional layout
  simpleKeyboard.init();
  simpleKeyboard.setLanguageLayout(languageSwitcher.lang.langState);

  /******************************
   * Initialize Views
   ******************************/
  timeoutModalInitFns();
  interactionEvents.init();
  attractView.init();
  introView.init();
  mainVideoView.init();
  formView.init();
  formConfirmationModal.init();
  formSubmissionModal.init();
});
