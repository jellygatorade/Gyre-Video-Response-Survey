import { domVars } from "./global-vars-dom.js";
import { fadeIn, fadeOut } from "../common/script/fade-in-out-elements.js";
import { fadeBetweenViews } from "./fade-between-views.js";
import { setupIdleTimerTier1 } from "./idle-timer-tier-1-background.js";
import { introView } from "./intro-view.js";

function removeAttractView() {
  // Proceed to intro view
  fadeBetweenViews(domVars.attractView, domVars.introView);
  //fadeBetweenViews(domVars.attractView, domVars.formView);

  // Start the three paragraph slideshow from intro view
  introView.playIntro();

  setTimeout(() => {
    // Pause the attract video
    domVars.attractVideo.pause();

    // Remove the attract video
    domVars.attractVideo.remove();
  }, 300);

  // Start the idle timer
  //setupIdleTimerTier1();
}

function attractViewInitFns() {
  domVars.attractOverlay.addEventListener("click", removeAttractView);
  //attractOverlay.addEventListener("touchend", removeAttractView);
}

// Exported to fetch script because depends on fetching of videopath from content.json
function createAttractLoop(videopath) {
  //apply the videopath arg to a source element's src tag within the video element
  domVars.attractVideo.insertAdjacentHTML(
    "afterbegin",
    '<source id="attract-video-source" src="' +
      videopath +
      '" type="video/mp4">'
  );

  // Set video to loop playback, mute audio, and play
  domVars.attractVideo.loop = true;
  domVars.attractVideo.muted = true;
  domVars.attractVideo.play();
}

export { attractViewInitFns, createAttractLoop };
