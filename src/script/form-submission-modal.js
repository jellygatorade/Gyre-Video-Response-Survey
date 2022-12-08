import { fadeOut } from "../common/script/fade-in-out-elements.js";
import { domVars } from "./global-vars-dom.js";

const countdownAmountInSeconds = 10; // How long the form submission success reset app countdown will take

const formSubmissionModal = {
  init: function () {
    this.timeLeft = countdownAmountInSeconds - 1;
    domVars.formSubmissionCountdownText.innerText =
      countdownAmountInSeconds.toString();
  },

  addTouchToFadeOut: function () {
    domVars.formSubmissionModalTapToContinueOverlay.addEventListener(
      "click",
      this.fadeOutModal
    );
  },

  removeTouchToFadeOut: function () {
    domVars.formSubmissionModalTapToContinueOverlay.removeEventListener(
      "click",
      this.fadeOutModal
    );
  },

  fadeOutModal: function () {
    fadeOut(domVars.formSubmissionModal);
  },

  result: function (result) {
    if (result === "success") {
      domVars.formSubmissionSuccess.classList.remove("hidden");
      domVars.formSubmissionError.classList.add("hidden");
    } else if (result === "error") {
      domVars.formSubmissionError.classList.remove("hidden");
      domVars.formSubmissionSuccess.classList.add("hidden");
    }
  },

  countdownTimer: undefined,
  timeLeft: undefined,
  resetTimeoutId: undefined,

  startCountdown: function () {
    const countdownIterator = this.countdownIterator.bind(this); // otherwise "this" becomes the window object because of setInterval context
    this.countdownTimer = setInterval(countdownIterator, 1000);
  },

  countdownIterator: function () {
    //console.log(`countdown iteration, timeLeft = ${this.timeLeft}`);
    if (this.timeLeft <= 0) {
      clearInterval(this.countdownTimer);
      this.timeLeft = countdownAmountInSeconds - 1;
      domVars.formSubmissionCountdownText.innerText = "0";
      clearTimeout(this.resetTimeoutId);
      // Reset the application
      this.resetTimeoutId = setTimeout(this.onCountdownComplete, 1000);
    } else {
      domVars.formSubmissionCountdownText.innerText = this.timeLeft;
    }
    this.timeLeft -= 1;
  },

  onCountdownComplete: function () {
    window.location.reload();
  },
};

export { formSubmissionModal };
