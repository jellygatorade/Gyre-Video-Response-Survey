import { domVars } from "./global-vars-dom.js";
import { interactionEvents } from "./interaction-events.js";
import { fadeIn, fadeOut } from "../common/script/fade-in-out-elements.js";
import { fadeBetweenViews } from "./fade-between-views.js";
import { mainVideoView } from "./main-video-view.js";
import { languageSwitcher } from "./language-switcher.js";

let slideDurationInSeconds = 12;

const introView = {
  init: function () {
    // "this" keyword needs to be set as the parent object, because "this" depends on execution context
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
    const proceedToMainVideo = this.proceedToMainVideo.bind(this);

    domVars.skipIntroButton.addEventListener("click", proceedToMainVideo);

    // "this" keyword needs to be set as the parent object, because "this" depends on execution context
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
    const displayControlsUserInteraction =
      this.displayControlsUserInteraction.bind(this);
    domVars.introView.addEventListener(
      interactionEvents.clickEvent,
      displayControlsUserInteraction
    );
  },

  // To store timeoutid values used to trigger the intro sequence
  introTimeouts: [],

  clearAllIntroTimeouts: function () {
    //console.log(this.introTimeouts);

    // Loop in reverse so that array.prototype.splice() method can be used to pop items off the end of the array while preserving the index
    // If you do this while looping forward through array the index gets jumbled every time one item is removed
    // Solution from frattero's answer:
    // https://stackoverflow.com/questions/9882284/looping-through-array-and-removing-items-without-breaking-for-loop
    for (let i = this.introTimeouts.length - 1; i >= 0; i--) {
      clearTimeout(this.introTimeouts[i]);
      this.introTimeouts.splice(i, 1); // remove the current id from the array after clearing its timeout
    }

    //console.log(this.introTimeouts);
  },

  hideAllIntroText: function () {
    for (let i = 0; i < domVars.introTextParent.children.length; i++) {
      fadeOut(domVars.introTextParent.children[i]);

      if (!domVars.introTextParent.children[i].classList.contains("hidden")) {
        domVars.introTextParent.children[i].classList.add("hidden");
      }
    }
  },

  // Run three paragraph slideshow
  playIntro: function () {
    // Animation functions are triggered with setTimeout
    this.clearAllIntroTimeouts();

    // Reset upon playback of this animation
    this.proceededToMainVideo = false;

    this.hideAllIntroText();

    this.initialControlsFade();

    // Fade in Text 1, show for slideDuration seconds, fade out text 1
    // Fade in Text 2, show for slideDuration seconds, fade out text 2
    // Fade in Text 3, show for slideDuration seconds, fade out text 3

    let time = 1 * 1000;
    let transitionTime = 1 * 1000;
    let slideDuration = slideDurationInSeconds * 1000;

    for (let i = 0; i < domVars.introTextParent.children.length; i++) {
      // Fade In
      this.introTimeouts.push(
        setTimeout(() => {
          domVars.introTextParent.children[i].classList.remove("hidden");

          this.introTimeouts.push(
            setTimeout(() => {
              fadeIn(domVars.introTextParent.children[i]);
            }, 100)
          );
        }, time)
      );

      // Fade Out
      this.introTimeouts.push(
        setTimeout(() => {
          fadeOut(domVars.introTextParent.children[i]);

          this.introTimeouts.push(
            setTimeout(() => {
              domVars.introTextParent.children[i].classList.add("hidden");
            }, transitionTime)
          );
        }, time + slideDuration - transitionTime)
      );

      time = time + slideDuration;
      //console.log(this.introTimeouts);
    }

    // then, proceedToMainVideo

    // "this" keyword needs to be set as the parent object, because "this" depends on execution context
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
    const proceedToMainVideo = this.proceedToMainVideo.bind(this);

    this.introTimeouts.push(setTimeout(proceedToMainVideo, time));
  },

  proceededToMainVideo: false,

  proceedToMainVideo: function () {
    // Check that main video has not already been run been
    if (!this.proceededToMainVideo) {
      this.clearAllIntroTimeouts();
      fadeBetweenViews(domVars.introView, domVars.mainVideoView);
      fadeOut(domVars.introViewControls);
      mainVideoView.setVideoPathLang(languageSwitcher.lang);
      mainVideoView.playVideoFns();
      this.proceededToMainVideo = true;
    }
  },

  // Used by apply-content-ui.js to put english and spanish intro text in place
  populateIntroText: function (data) {
    if (data.en.intro.text_array.length !== data.es.intro.text_array.length) {
      console.error(
        "En/Es intro text arrays not same length in content.json, intro text will not appear correctly."
      );
      return;
    } else {
      // Copy the domVars.introTextPrototype and populate the english and spanish texts
      for (let i = 0; i < data.en.intro.text_array.length; i++) {
        let introTextParagraph = domVars.introTextPrototype.cloneNode(true);
        let introTextParent = domVars.introTextPrototype.parentElement;

        let introTextEn = introTextParagraph.querySelector('[lang="en"]');
        let introTextEs = introTextParagraph.querySelector('[lang="es"]');

        introTextEn.innerHTML = data.en.intro.text_array[i];
        introTextEs.innerHTML = data.es.intro.text_array[i];

        //introTextParagraph.classList.remove("hidden");
        introTextParagraph.id = `intro-text-${i + 1}`;
        fadeOut(introTextParagraph);

        // Append to DOM
        introTextParent.appendChild(introTextParagraph);
      }

      // Delete the prototype from DOM
      domVars.introTextPrototype.remove();
    }
  },

  // Display controls for 5 seconds on page load then fade
  initialControlsFade: function () {
    fadeIn(domVars.introViewControls);
    clearTimeout(this.controlsTimer);
    this.timeFadeOut();
  },

  controlsTimer: undefined,

  controlsTimeVisible: 5000,

  timeFadeOut: function () {
    this.controlsTimer = setTimeout(function () {
      fadeOut(domVars.introViewControls);
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
      domVars.introViewControls.contains(event.target)
    ) {
      this.timeFadeOut();
      //console.log("1");
    } else if (domVars.introView.contains(event.target)) {
      // User has interacted within this view, but not any controls
      if (domVars.introViewControls.classList.contains("invisible")) {
        // Controls are invisible, fade in
        fadeIn(domVars.introViewControls);
        this.timeFadeOut();
        //console.log("2");
      } else {
        // Controls are visible, fade out
        fadeOut(domVars.introViewControls);
        //console.log("3");
      }
    }
  },
};

export { introView };
