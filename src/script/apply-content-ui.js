import { domVars } from "./global-vars-dom.js";
import { introView } from "./intro-view.js";

function applyContent(data) {
  // Spanish availability
  // Set domVars.toggleLangButton to "display: none;" if not available
  if (!data.es.is_available) {
    domVars.introToggleLangButton.classList.add("hidden");
    domVars.formToggleLangButton.classList.add("hidden");
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
  // Pass intro statement arrays to create en/es intro statements
  introView.populateIntroText(data);

  domVars.enSkipIntroButton.innerHTML = data.en.intro.skip_intro;
  domVars.esSkipIntroButton.innerHTML = data.es.intro.skip_intro;

  // Main Video View
  domVars.enMainVideoReturnHomeBtnTxt.innerHTML =
    data.en.main_video.restart_intro;
  domVars.esMainVideoReturnHomeBtnTxt.innerHTML =
    data.es.main_video.restart_intro;

  // Form + Virtual Keyboard View
  domVars.enFormResponseIntro.innerHTML = data.en.form.response_intro;
  domVars.enFormResponseQuestion.innerHTML = data.en.form.response_question;
  domVars.enFormWordsRemaining.innerHTML = data.en.form.words_remaining;
  domVars.enFormSubmit.innerHTML = data.en.form.submit;
  domVars.enFormViewRestartIntroBtnTxt.innerHTML = data.en.form.restart_intro;

  domVars.esFormResponseIntro.innerHTML = data.es.form.response_intro;
  domVars.esFormResponseQuestion.innerHTML = data.es.form.response_question;
  domVars.esFormWordsRemaining.innerHTML = data.es.form.words_remaining;
  domVars.esFormSubmit.innerHTML = data.es.form.submit;
  domVars.esFormViewRestartIntroBtnTxt.innerHTML = data.es.form.restart_intro;

  // Form Confirmation Modal
  domVars.enFormConfirmationTopText.innerHTML =
    data.en.form_confirm_modal.top_text;
  domVars.enFormConfirmationBackButton.innerHTML =
    data.en.form_confirm_modal.go_back;
  domVars.enFormConfirmationConfirmButton.innerHTML =
    data.en.form_confirm_modal.confirm_and_submit;

  domVars.esFormConfirmationTopText.innerHTML =
    data.es.form_confirm_modal.top_text;
  domVars.esFormConfirmationBackButton.innerHTML =
    data.es.form_confirm_modal.go_back;
  domVars.esFormConfirmationConfirmButton.innerHTML =
    data.es.form_confirm_modal.confirm_and_submit;

  // Form Submission Modal
  domVars.enFormSuccessTopText.innerHTML =
    data.en.form_submit_modal.success_top;
  domVars.enFormSuccessTimeoutText.innerHTML =
    data.en.form_submit_modal.success_timeout;
  domVars.enFormErrorTopText.innerHTML = data.en.form_submit_modal.error_top;
  domVars.enFormErrorBottomText.innerHTML =
    data.en.form_submit_modal.error_bottom;

  domVars.esFormSuccessTopText.innerHTML =
    data.es.form_submit_modal.success_top;
  domVars.esFormSuccessTimeoutText.innerHTML =
    data.es.form_submit_modal.success_timeout;
  domVars.esFormErrorTopText.innerHTML = data.es.form_submit_modal.error_top;
  domVars.esFormErrorBottomText.innerHTML =
    data.es.form_submit_modal.error_bottom;
}

export { applyContent };
