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

  // Main
  domVars.toggleLangButton = document.getElementById("toggle-lang-button");

  // Form + Virtual Keyboard View
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

  domVars.toggleLangButton = document.getElementById("toggle-lang-button");

  domVars.simpleKeyboard = document.getElementById("simple-keyboard");
});

export { domVars };
