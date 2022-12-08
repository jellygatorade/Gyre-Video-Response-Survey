import { loadIdleTimerTier2 } from "./idle-timer-tier-2-timeout-modal.js";

// Taken from the Chris Holt application
//
// Built using this reference for the idle detection function
// https://www.kirupa.com/html5/detecting_if_the_user_is_idle_or_inactive.htm
//
// Refering to this stackoverflow post 3/29 to update this script
// https://stackoverflow.com/questions/667555/how-to-detect-idle-time-in-javascript

// This script defines timeout functions for taking action on idle

//const idleTimeoutInMilliseconds = 5 * 1000; // For dev - 5 seconds
const idleTimeoutInMilliseconds = 90 * 1000; // For production - 90 seconds
let idleTimeoutId;

// Initialize state variable for idle timer tier 1
let idleTimerTier1Running;

function startIdleTimer() {
  // window.setTimeout returns an Id that can be used to start and stop a timer
  idleTimeoutId = window.setTimeout(doInactive, idleTimeoutInMilliseconds);
}

let doInactiveTimeoutId;
function doInactive() {
  // Action taken on inactivity
  loadIdleTimerTier2();
}

function setupIdleTimerTier1() {
  if (idleTimerTier1Running !== true) {
    console.log("Set up idle timer - Tier 1"); // Debug timer
    idleTimerTier1Running = true;
    // Each of these events will reset the timer
    window.addEventListener("mousemove", resetTimer, false); // fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it
    window.addEventListener("mousedown", resetTimer, false); // fired at an element when a pointing device button is pressed while the pointer is inside the element (differs from "click")
    window.addEventListener("keydown", resetTimer, false); // fired when a key is pressed (for all keys, regardless of whether they produce a character value)
    window.addEventListener("DOMMouseScroll", resetTimer, false); // deprecated for "wheel"
    window.addEventListener("mousewheel", resetTimer, false); // deprecated for "wheel"
    window.addEventListener("wheel", resetTimer, false); // fires when the user rotates a wheel button on a pointing device (typically a mouse)
    window.addEventListener("scroll", resetTimer, true); // useCapture set to true because scroll events do not bubble, must be captured. https://stackoverflow.com/questions/19656673/why-does-scroll-event-not-bubble
    window.addEventListener("touchmove", resetTimer, false); // fired when one or more touch points are moved along the touch surface
    window.addEventListener("touchstart", resetTimer, false); // fired when one or more touch points are placed on the touch surface
    window.addEventListener("pointermove", resetTimer, false); // fired when a pointer changes coordinates, and the pointer has not been canceled by a browser touch-action
    startIdleTimer();
  }
}

function goActive() {
  console.log("Go active"); // Debug timer
  clearTimeout(doInactiveTimeoutId); // clear if this was set in doInactive
  startIdleTimer();
  // Do something else
}

function resetTimer() {
  window.clearTimeout(idleTimeoutId);
  goActive();
}

function removeIdleTimerTier1() {
  if (idleTimerTier1Running === true) {
    console.log("Remove idle timer - Tier 1"); // Debug timer
    window.removeEventListener("mousemove", resetTimer, false); // fired at an element when a pointing device (usually a mouse) is moved while the cursor's hotspot is inside it
    window.removeEventListener("mousedown", resetTimer, false); // fired at an element when a pointing device button is pressed while the pointer is inside the element (differs from "click")
    window.removeEventListener("keydown", resetTimer, false); // fired when a key is pressed (for all keys, regardless of whether they produce a character value)
    window.removeEventListener("DOMMouseScroll", resetTimer, false); // deprecated for "wheel"
    window.removeEventListener("mousewheel", resetTimer, false); // deprecated for "wheel"
    window.removeEventListener("wheel", resetTimer, false); // fires when the user rotates a wheel button on a pointing device (typically a mouse)
    window.removeEventListener("scroll", resetTimer, true); // useCapture set to true because scroll events do not bubble, must be captured. https://stackoverflow.com/questions/19656673/why-does-scroll-event-not-bubble
    window.removeEventListener("touchmove", resetTimer, false); // fired when one or more touch points are moved along the touch surface
    window.removeEventListener("touchstart", resetTimer, false); // fired when one or more touch points are placed on the touch surface
    window.removeEventListener("pointermove", resetTimer, false); // fired when a pointer changes coordinates, and the pointer has not been canceled by a browser touch-action
    window.clearTimeout(idleTimeoutId);
    idleTimerTier1Running = false;
  }
}

// Export removeIdleTimerTier1 and setupIdleTimerTier1 and so that the idle timer can be suspended selectively the application
export { removeIdleTimerTier1, setupIdleTimerTier1 };
