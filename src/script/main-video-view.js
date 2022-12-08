import { domVars } from "./global-vars-dom.js";
import { interactionEvents } from "./interaction-events.js";
import { fadeIn, fadeOut } from "../common/script/fade-in-out-elements.js";
import { fadeBetweenViews } from "./fade-between-views.js";
import { introView } from "./intro-view.js";
import { setupIdleTimerTier1 } from "./idle-timer-tier-1-background.js";

const mainVideoView = {
  init: function () {
    domVars.mainVideoViewRestartIntroBtn.addEventListener(
      "click",
      this.returnToIntroView
    );

    // "this" keyword needs to be set as the parent object, because "this" depends on execution context
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
    const displayControlsUserInteraction =
      this.displayControlsUserInteraction.bind(this);
    domVars.mainVideoView.addEventListener(
      interactionEvents.clickEvent,
      displayControlsUserInteraction
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
    //console.log("play requested");
    this.initialControlsFade();
  },

  pauseVideoFns: function () {
    domVars.mainVideo.pause();
  },

  proceedToFormView: function () {
    fadeBetweenViews(domVars.mainVideoView, domVars.formView);
    setupIdleTimerTier1();
  },

  returnToIntroView: function () {
    fadeBetweenViews(domVars.mainVideoView, domVars.introView);
    setTimeout(() => {
      domVars.mainVideo.pause();
    }, 300);
    introView.playIntro();
  },

  returnHome: function () {
    window.location.reload();
  },

  // Display controls for 5 seconds on page load then fade
  initialControlsFade: function () {
    fadeIn(domVars.mainVideoViewRestartIntroBtn);
    clearTimeout(this.controlsTimer);
    this.timeFadeOut();
  },

  controlsTimer: undefined,

  controlsTimeVisible: 5000,

  timeFadeOut: function () {
    this.controlsTimer = setTimeout(function () {
      fadeOut(domVars.mainVideoViewRestartIntroBtn);
      //console.log("delayed fade execute");
    }, this.controlsTimeVisible);
  },

  // // Display controls on user interaction with videoPlayerView
  // // videoPlayerView equivalent to screenDiv in the original SpeedStick.mp4/Peruvian Vessel HTML5 video app
  // // (takes up full viewport and is root node of all video player elements so all events will bubble to it unless stopped)
  // videoPlayerView.addEventListener(clickEvent, displayControlsUserInteraction);

  displayControlsUserInteraction: function (event) {
    //console.log(event.target);
    clearTimeout(this.controlsTimer);
    if (
      // User has interacted with a UI element for video control
      // In versions with more playback controls they would all be included specifically here with or operators
      domVars.mainVideoViewRestartIntroBtn.contains(event.target)
    ) {
      this.timeFadeOut();
      //console.log("1");
    } else if (domVars.mainVideoView.contains(event.target)) {
      // User has interacted within the video view, but not any controls
      if (
        domVars.mainVideoViewRestartIntroBtn.classList.contains("invisible")
      ) {
        // Controls are invisible, fade in
        fadeIn(domVars.mainVideoViewRestartIntroBtn);
        this.timeFadeOut();
        //console.log("2");
      } else {
        // Controls are visible, fade out
        fadeOut(domVars.mainVideoViewRestartIntroBtn);
        //console.log("3");
      }
    }
  },
};

export { mainVideoView };
