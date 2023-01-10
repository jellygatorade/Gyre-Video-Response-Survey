import { domVars } from "./global-vars-dom.js";
import { fadeIn, fadeOut } from "../common/script/fade-in-out-elements.js";
import { fadeBetweenViews } from "./fade-between-views.js";
import { introView } from "./intro-view.js";

// For development only
import { formSubmissionModal } from "./form-submission-modal.js";

const attractView = {
  init: function () {
    const removeAttractView = this.removeAttractView.bind(this);
    domVars.attractOverlay.addEventListener("click", removeAttractView);
  },

  createAttractLoop: function (videopath) {
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
  },

  removeAttractView: function () {
    // Proceed to intro view
    fadeBetweenViews(domVars.attractView, domVars.introView);

    // Start the three paragraph slideshow from intro view
    introView.playIntro();

    // // For developement only
    // fadeBetweenViews(domVars.attractView, domVars.formView);

    setTimeout(() => {
      // Pause the attract video
      domVars.attractVideo.pause();

      // Remove the attract video
      domVars.attractVideo.remove();
    }, 300);

    // Start the idle timer
    //setupIdleTimerTier1();
  },
};

export { attractView };
