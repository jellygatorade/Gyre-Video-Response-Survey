import { domVars } from "./global-vars-dom.js";
import { fadeIn, fadeOut } from "../common/script/fade-in-out-elements.js";
import { fadeBetweenViews } from "./fade-between-views.js";

const mainVideoView = {
  init: function () {
    domVars.mainVideoViewReturnHomeBtn.addEventListener(
      "click",
      this.returnHome
    );
    domVars.mainVideo.addEventListener("ended", this.proceedToFormView);
  },

  videoPaths: { en: "", es: "" },

  storeVideoPaths: function (data) {
    this.videoPaths.en = data.en.main_video.main_video_path;
    this.videoPaths.es = data.es.main_video.main_video_path;
  },

  setVideoPathLang: function (lang) {
    if (lang.langState === "en") {
      domVars.mainVideoSource.src = this.videoPaths.en;
      this.loadVideo();
    } else if (lang.langState === "es") {
      domVars.mainVideoSource.src = this.videoPaths.es;
      this.loadVideo();
    }
  },

  loadVideo: function () {
    domVars.mainVideo.load();
  },

  playVideoFns: function () {
    domVars.mainVideo.play();
    console.log("play requested");
  },

  pauseVideoFns: function () {
    domVars.mainVideo.pause();
  },

  proceedToFormView: function () {
    fadeBetweenViews(domVars.mainVideoView, domVars.formView);
  },

  returnHome: function () {
    window.location.reload();
  },
};

export { mainVideoView };
