const domVars = {};

window.addEventListener("load", () => {
  // Timeout Modal
  domVars.timeoutModal = document.getElementById("timeout-modal");
  domVars.timeoutModalOverlay = document.getElementById(
    "timeout-modal-overlay"
  );
  domVars.timeoutModalTapToContinueOverlay = document.getElementById(
    "timeout-modal-tap-to-continue-overlay"
  );
  domVars.timeoutCountdownText = document.getElementById(
    "timeout-countdown-text"
  );

  domVars.enTimeoutQuestion = document.getElementById("en-timeout-question");
  domVars.enTimeoutInstruction = document.getElementById(
    "en-timeout-instruction"
  );

  domVars.esTimeoutQuestion = document.getElementById("es-timeout-question");
  domVars.esTimeoutInstruction = document.getElementById(
    "es-timeout-instruction"
  );

  // Fade Between Views Overlay
  domVars.fadeBetweenViewsOverlay = document.getElementById(
    "fade-between-views-overlay"
  );

  // Attract View
  domVars.attractView = document.getElementById("attract-view");
  domVars.attractVideo = document.getElementById("attract-video");
  domVars.attractOverlay = document.getElementById("attract-overlay");

  domVars.enAttractTitle = document.getElementById("en-attract-title");
  domVars.esAttractTitle = document.getElementById("es-attract-title");

  domVars.enAttractTouchToBegin = document.getElementById(
    "en-attract-touch-to-begin"
  );

  domVars.esAttractTouchToBegin = document.getElementById(
    "es-attract-touch-to-begin"
  );

  // Intro View
  domVars.introView = document.getElementById("intro-view");

  domVars.introTextParent = document.getElementById("intro-text-parent");
  domVars.introTextPrototype = document.getElementById("intro-text-prototype");
  domVars.introTexts = [];

  domVars.introViewControls = document.getElementById("intro-view-controls");
  domVars.introToggleLangButton = document.getElementById(
    "intro-toggle-lang-button"
  );
  domVars.skipIntroButton = document.getElementById("skip-intro-button");
  domVars.enSkipIntroButton = document.getElementById("en-skip-intro-button");
  domVars.esSkipIntroButton = document.getElementById("es-skip-intro-button");

  // Main Video View
  domVars.mainVideoView = document.getElementById("main-video-view");
  domVars.mainVideoViewRestartIntroBtn = document.getElementById(
    "main-video-view-restart-intro-btn"
  );
  domVars.enMainVideoReturnHomeBtnTxt = document.getElementById(
    "en-main-video-return-home-btn-txt"
  );
  domVars.esMainVideoReturnHomeBtnTxt = document.getElementById(
    "es-main-video-return-home-btn-txt"
  );

  domVars.mainVideo = document.getElementById("main-video");
  domVars.mainVideoSource = document.getElementById("main-video-source");

  // Form + Virtual Keyboard View
  domVars.formView = document.getElementById("form-keyboard-view");

  domVars.responseForm = document.getElementById("response-form");
  domVars.responseFormTextArea = document.getElementById(
    "response-form-textarea"
  );
  domVars.textAreaWordsRemaining = document.getElementById(
    "textarea-words-remaining"
  );
  domVars.responseFormSubmitBtn = document.getElementById(
    "response-form-submit-button"
  );

  domVars.enFormResponseIntro = document.getElementById(
    "en-form-response-intro"
  );
  domVars.esFormResponseIntro = document.getElementById(
    "es-form-response-intro"
  );
  domVars.enFormResponseQuestion = document.getElementById(
    "en-form-response-question"
  );
  domVars.esFormResponseQuestion = document.getElementById(
    "es-form-response-question"
  );

  domVars.enFormWordsRemaining = document.getElementById(
    "en-form-words-remaining"
  );
  domVars.esFormWordsRemaining = document.getElementById(
    "es-form-words-remaining"
  );

  domVars.enFormSubmit = document.getElementById("en-form-submit");
  domVars.esFormSubmit = document.getElementById("es-form-submit");

  domVars.formToggleLangButton = document.getElementById(
    "form-toggle-lang-button"
  );

  domVars.simpleKeyboard = document.getElementById("simple-keyboard");
});

export { domVars };
