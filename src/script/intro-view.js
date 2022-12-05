import { domVars } from "./global-vars-dom.js";
import { fadeIn, fadeOut } from "../common/script/fade-in-out-elements.js";
import { fadeBetweenViews } from "./fade-between-views.js";
import { mainVideoView } from "./main-video-view.js";
import { lang } from "./language-switcher.js";

const introView = {
  init: function () {
    domVars.skipIntroButton.addEventListener("click", this.proceedToMainVideo);
  },

  // Run three paragraph slideshow
  playIntro: function () {
    // FadeIn Text 1, show for 20 seconds, fade out text 1
    // FadeIn Text 2, show for 20 seconds, fade out text 2
    // FadeIn Text 3, show for 20 seconds, fade out text 3
    // then, proceedToMainVideo
  },

  proceedToMainVideo: function () {
    fadeBetweenViews(domVars.introView, domVars.mainVideoView);
    mainVideoView.setVideoPathLang(lang);
    mainVideoView.playVideoFns();
  },
};

export { introView };
