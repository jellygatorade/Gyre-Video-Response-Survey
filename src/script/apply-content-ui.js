import { domVars } from "./global-vars-dom.js";

function applyContent(data) {
  // Spanish availability
  // Set domVars.toggleLangButton to "display: none;" if not available
  if (!data.es.is_available) {
    domVars.toggleLangButton.classList.add("hidden");
  }

  // Timeout Modal
  domVars.enTimeoutQuestion.innerHTML = data.en.general.timeout.question;
  domVars.enTimeoutInstruction.innerHTML = data.en.general.timeout.instruction;

  domVars.esTimeoutQuestion.innerHTML = data.es.general.timeout.question;
  domVars.esTimeoutInstruction.innerHTML = data.es.general.timeout.instruction;

  // Attract View
  domVars.enAttractTitle.innerHTML = data.en.attract.heading;
  domVars.esAttractTitle.innerHTML = data.es.attract.heading;

  domVars.enAttractTouchToBegin.innerHTML = data.en.attract.touch_to_begin;
  domVars.esAttractTouchToBegin.innerHTML = data.es.attract.touch_to_begin;

  // Intro View
  domVars.enSkipIntroButton.innerHTML = data.en.intro.skip_intro;
  domVars.esSkipIntroButton.innerHTML = data.es.intro.skip_intro;

  // Main Video View
  domVars.enMainVideoReturnHomeBtnTxt.innerHTML =
    data.en.main_video.return_home;
  domVars.esMainVideoReturnHomeBtnTxt.innerHTML =
    data.es.main_video.return_home;

  // Form + Virtual Keyboard View
  domVars.enFormResponseIntro.innerHTML = data.en.form.response_intro;
  domVars.enFormResponseQuestion.innerHTML = data.en.form.response_question;
  domVars.enFormWordsRemaining.innerHTML = data.en.form.words_remaining;
  domVars.enFormSubmit.innerHTML = data.en.form.submit;

  domVars.esFormResponseIntro.innerHTML = data.es.form.response_intro;
  domVars.esFormResponseQuestion.innerHTML = data.es.form.response_question;
  domVars.esFormWordsRemaining.innerHTML = data.es.form.words_remaining;
  domVars.esFormSubmit.innerHTML = data.es.form.submit;
}

export { applyContent };
