import { callFetchCreateUI } from "./fetch.js";
import { languageSwitcher } from "./language-switcher.js";
import { timeoutModalInitFns } from "./idle-timer-tier-2-timeout-modal.js";
import {
  removeIdleTimerTier1,
  setupIdleTimerTier1,
} from "./idle-timer-tier-1-background.js";
import { interactionEvents } from "./interaction-events.js";
import { attractView } from "./attract-view.js";
import { introView } from "./intro-view.js";
import { mainVideoView } from "./main-video-view.js";

import { domVars } from "./global-vars-dom.js";
import {
  formView,
  checkWordLimit,
  handleFormSubmit,
} from "./handle-form-input.js";
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

  simpleKeyboard.init();
  simpleKeyboard.setLanguageLayout(languageSwitcher.lang.langState);

  /******************************
   * Initialize Views
   ******************************/
  interactionEvents.init();
  attractView.init();
  introView.init();
  mainVideoView.init();

  /******************************
   * Timeout timer
   ******************************/
  timeoutModalInitFns();
  //setupIdleTimerTier1();

  /******************************
   * Form
   ******************************/
  formView.init();

  // These should be moved to within formInit()
  // Also checkWordLimit vs checkWordLimitExport?
  domVars.responseFormTextArea.addEventListener("input", checkWordLimit); // For physical keyboard input

  domVars.responseFormSubmitBtn.addEventListener("click", handleFormSubmit);
});
