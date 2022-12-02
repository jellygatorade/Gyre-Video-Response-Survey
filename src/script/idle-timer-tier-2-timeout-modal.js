import { domVars } from "./global-vars-dom.js";
import {
  removeIdleTimerTier1,
  setupIdleTimerTier1,
} from "./idle-timer-tier-1-background.js";
import { fadeIn, fadeOut } from "../common/script/fade-in-out-elements.js";

const countdownAmountInSeconds = 15; // How long the "Are you still there?" countdown will take

function timeoutModalInitFns() {
  domVars.timeoutModalTapToContinueOverlay.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();
      clearInterval(countdownTimer);
      timeLeft = countdownAmountInSeconds - 1;
      setupIdleTimerTier1();
      fadeOut(domVars.timeoutModal);
    }
  );
}

let timeLeft = countdownAmountInSeconds - 1;
let countdownTimer;
let resetLabelViewTimeoutId;
function countdownIterator() {
  //console.log(`countdown iteration, timeLeft = ${timeLeft}`);
  if (timeLeft <= 0) {
    clearInterval(countdownTimer);
    timeLeft = countdownAmountInSeconds - 1;
    domVars.timeoutCountdownText.innerText = "0";
    clearTimeout(resetLabelViewTimeoutId);
    // Reset the application
    resetLabelViewTimeoutId = setTimeout(refreshAppFns, 1000);
  } else {
    domVars.timeoutCountdownText.innerText = timeLeft;
  }
  timeLeft -= 1;
}

function runIdleTimerTier2() {
  countdownTimer = setInterval(countdownIterator, 1000);
}

function loadIdleTimerTier2() {
  fadeIn(domVars.timeoutModal);
  removeIdleTimerTier1();
  domVars.timeoutCountdownText.innerText = countdownAmountInSeconds;
  timeLeft = countdownAmountInSeconds - 1;
  runIdleTimerTier2();
}

function refreshAppFns() {
  window.location.reload();
}

export { loadIdleTimerTier2, timeoutModalInitFns };
