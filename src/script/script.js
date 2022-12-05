import { callFetchCreateUI } from "./fetch.js";
import {
  languageSwitcherInit,
  applyLanguage,
  setLanguage,
  lang,
} from "./language-switcher.js";
import { timeoutModalInitFns } from "./idle-timer-tier-2-timeout-modal.js";
import {
  removeIdleTimerTier1,
  setupIdleTimerTier1,
} from "./idle-timer-tier-1-background.js";
import { attractViewInitFns } from "./attract-view.js";
import { introView } from "./intro-view.js";
import { mainVideoView } from "./main-video-view.js";

import { domVars } from "./global-vars-dom.js";
import {
  formInit,
  checkWordLimit,
  handleFormSubmit,
} from "./handle-form-input.js";
import { simpleKeyboardInit } from "./simple-keyboard.js";

window.addEventListener("load", () => {
  /******************************
   * UI + Langauge
   ******************************/
  callFetchCreateUI();
  languageSwitcherInit();

  // Determine if there was a language previously set
  if (localStorage.getItem("langState")) {
    setLanguage(localStorage.getItem("langState"));
  }

  // Apply the language specified in current "langState"
  applyLanguage(lang.langState);

  /******************************
   * Initialize Views
   ******************************/
  attractViewInitFns();
  introView.init();
  mainVideoView.init();

  /******************************
   * Timeout timer
   ******************************/
  timeoutModalInitFns();
  //setupIdleTimerTier1();

  /******************************
   * From + Virtual Keyboard
   ******************************/
  formInit();

  domVars.responseFormTextArea.addEventListener("input", checkWordLimit); // For physical keyboard input

  domVars.responseFormSubmitBtn.addEventListener("click", handleFormSubmit);

  simpleKeyboardInit();
});
