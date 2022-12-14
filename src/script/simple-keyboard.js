import { domVars } from "./global-vars-dom.js";
import {
  //wordCount,
  //charCount,
  //checkWordLimitSimpleKeyboard,
  //checkCharLimitSimpleKeyboard,
  formInput,
} from "./handle-form-input.js";

const layouts = {
  en: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
      "{tab} q w e r t y u i o p [ ] \\",
      "{lock} a s d f g h j k l ; ' {enter}",
      "{shift} z x c v b n m , . / {shift}",
      ".com @ {space}",
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      ".com {space}",
    ],
    caps: [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
      "{tab} Q W E R T Y U I O P { } |",
      '{lock} A S D F G H J K L : " {enter}',
      "{shift} Z X C V B N M < > ? {shift}",
      ".com {space}",
    ],
  },
  es: {
    default: [
      "\u007c 1 2 3 4 5 6 7 8 9 0 ' \u00bf {bksp}",
      "{tab} q w e r t y u i o p \u0301 +",
      "{lock} a s d f g h j k l \u00f1 \u007b \u007d {enter}",
      "{shift} < z x c v b n m , . - {shift}",
      ".com @ {space}",
    ],
    shift: [
      '\u00b0 ! " # $ % & / ( ) = ? \u00a1 {bksp}',
      "{tab} Q W E R T Y U I O P \u0308 *",
      "{lock} A S D F G H J K L \u00d1 \u005b \u005d {enter}",
      "{shift} > Z X C V B N M ; : _ {shift}",
      ".com @ {space}",
    ],
    caps: [
      '\u00b0 ! " # $ % & / ( ) = ? \u00a1 {bksp}',
      "{tab} Q W E R T Y U I O P \u0308 *",
      "{lock} A S D F G H J K L \u00d1 \u005b \u005d {enter}",
      "{shift} > Z X C V B N M ; : _ {shift}",
      ".com @ {space}",
    ],
  },
};

const simpleKeyboard = {
  theKeyboard: undefined,

  setLanguageLayout: function (lang) {
    //console.log(this.afterKeyPressCaretPos);

    if (lang === "en") {
      // Change keyboard layout to english
      this.theKeyboard.setOptions({
        layout: layouts.en,
      });
      this.setStyle();
    } else if (lang === "es") {
      // Change keyboard layout to spanish
      this.theKeyboard.setOptions({
        layout: layouts.es,
      });
      this.setStyle();
    }

    // Reset the caret position
    this.theKeyboard.setCaretPosition(this.afterKeyPressCaretPos);
    //console.log(this.theKeyboard.getCaretPosition());
  },

  init: function () {
    const Keyboard = window.SimpleKeyboard.default;

    domVars.simpleKeyboard.addEventListener("touchstart", (event) => {
      event.preventDefault();
    });

    this.theKeyboard = new Keyboard({
      onChange: (input, event) => this.onChange(input, event),
      onKeyPress: (button) => this.onKeyPress(button),
      onKeyReleased: (button) => this.onKeyReleased(button),
      theme:
        "hg-theme-default hg-layout-default text-black bg-transparent font-CaseTextRegular", // set initial css classes for the keyboard element
      layout: layouts.en, // initialized as en, but calling this.setLanguageLayout() in script.js
      excludeFromLayout: {
        default: ["@", ".com"],
        shift: [".com"],
        caps: [".com"],
      },
    });

    this.setStyle();
  },

  onChange: function (input, event) {
    //checkWordLimitSimpleKeyboard(input);

    //formInput.checkWordLimitSimpleKeyboard(input);
    formInput.checkCharLimitSimpleKeyboard(input);

    if (
      //wordCount.atLimit &&
      //charCount.atLimit &&
      //formInput.wordCount.atLimit &&
      formInput.charCount.atLimit &&
      event.target.getAttribute("data-skbtn") === "{bksp}"
    ) {
      // Delete a character
      document.querySelector(".input").value = input;
    } else if (
      //wordCount.atLimit &&
      //charCount.atLimit &&
      //formInput.wordCount.atLimit &&
      formInput.charCount.atLimit &&
      event.target.getAttribute("data-skbtn") !== "{bksp}"
    ) {
      /********************************************************************************************
       * Do not change the input
       *
       * For some reason if this condition is hit the textarea has to be refocused/caret replaced?
       * I spent nearly a whole workday on this bug was not able to figure out why.
       *
       * 12/9 Maybe it's because setSelectionRange is set to range beyond possible in this case?
       ********************************************************************************************/
    } else {
      // Add a character
      document.querySelector(".input").value = input;
    }

    // Move the caret to the correct position
    // Otherwise the caret is set at end of string when <textarea>.value is set
    domVars.responseFormTextArea.setSelectionRange(
      this.afterKeyPressCaretPos,
      this.afterKeyPressCaretPos
    );
  },

  beforeKeyPressCaretPos: 0,
  afterKeyPressCaretPos: 0,

  onKeyPress: function (button) {
    //console.log("KeyPress");

    // Add line break if enter key pressed
    if (button === "{enter}") {
      this.theKeyboard.setInput(document.querySelector(".input").value + "\n");
    } else {
      this.theKeyboard.setInput(document.querySelector(".input").value);
    }

    // Determine correct caret position
    if (!this.theKeyboard.getCaretPosition()) {
      this.theKeyboard.setCaretPosition(0);
    }

    this.beforeKeyPressCaretPos = this.theKeyboard.getCaretPosition();

    if (button === "{bksp}") {
      this.afterKeyPressCaretPos = this.beforeKeyPressCaretPos - 1; // one char deleted, so left one position
    } else {
      this.afterKeyPressCaretPos = this.beforeKeyPressCaretPos + 1; // one char added, so right one position
    }

    //console.log(this.beforeKeyPressCaretPos, this.afterKeyPressCaretPos);
  },

  onKeyReleased: function (button) {
    //console.log("KeyReleased");

    // Handle shift and capslock buttons
    this.shiftToggle(button);
  },

  shiftToggle: function (button) {
    let currentLayout = this.theKeyboard.options.layoutName;

    switch (button) {
      case "{lock}":
        // Caps lock pressed
        if (currentLayout === "caps") {
          this.setLayout("default");
        } else {
          this.setLayout("caps");
        }
        break;

      case "{shift}":
        // Shift pressed
        if (currentLayout === "shift" || currentLayout === "caps") {
          // Shift was most recently pressed, so toggle it off
          this.setLayout("default");
        } else {
          this.setLayout("shift");
        }
        break;

      default:
        // Another button pressed (not shift or caps lock)
        if (currentLayout === "shift") {
          // Toggle shift off
          this.setLayout("default");
        }
    }
  },

  setLayout: function (layoutstring) {
    this.theKeyboard.setOptions({
      layoutName: layoutstring,
    });

    this.setStyle();
  },

  setStyle: function () {
    // Modify css for the keyboard element, rows direct parent
    domVars.simpleKeyboard.classList.add("max-w-[960px]");

    // Modify css for the individual key buttons
    // Height can be adjusted by assigning height to each individual key, default is 40px in .hg-theme-default .hg-button
    const keys = domVars.simpleKeyboard.querySelectorAll(".hg-button"); // returns NodeList
    keys.forEach((key) => {
      //key.classList.add("h-[60px]"); // for some css reason the .hg-theme-default .hg-button class takes priority over the tailwind class
      key.style.height = "60px"; // so use inline style
    });
  },
};

export { simpleKeyboard };
