import { domVars } from "./global-vars-dom.js";
import { wordCount, checkWordLimitExport } from "./handle-form-input.js";

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
    checkWordLimitExport(input);

    if (
      wordCount.atLimit &&
      event.target.getAttribute("data-skbtn") === "{bksp}"
    ) {
      // Delete a character
      document.querySelector(".input").value = input;
    } else if (
      wordCount.atLimit &&
      event.target.getAttribute("data-skbtn") !== "{bksp}"
    ) {
      /********************************************************************************************
       * Do not change the input
       *
       * For some reason if this condition is hit the textarea has to be refocused/caret replaced?
       * I spent nearly a whole workday on this bug was not able to figure out why.
       ********************************************************************************************/
    } else {
      // Add a character
      document.querySelector(".input").value = input;
    }

    // Move the caret to the correct position
    // Otherwise the caret is set at end of string when <textarea>.value is set
    domVars.responseFormTextArea.setSelectionRange(
      this.newCaretPos,
      this.newCaretPos
    );
  },

  lastPressedCaretPos: 0,
  newCaretPos: 0,

  onKeyPress: function (button) {
    //console.log("KeyPress");

    // Add line break if enter key pressed
    if (button === "{enter}") {
      this.theKeyboard.setInput(document.querySelector(".input").value + "\n");
    } else {
      this.theKeyboard.setInput(document.querySelector(".input").value);
    }

    // Determine correct caret position
    this.lastPressedCaretPos = this.theKeyboard.getCaretPosition();

    if (button === "{bksp}") {
      this.newCaretPos = this.lastPressedCaretPos - 1; // one char deleted, so left one position
    } else {
      this.newCaretPos = this.lastPressedCaretPos + 1; // one char added, so right one position
    }
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

// let myKeyboard;

// function keyboardLang(lang) {
//   console.log(lang);
//   if (lang === "en") {
//   } else if (lang === "es") {
//   }
// }

// function simpleKeyboardInit() {
//   const Keyboard = window.SimpleKeyboard.default;

//   domVars.simpleKeyboard.addEventListener("touchstart", (event) => {
//     event.preventDefault();
//   });

//   myKeyboard = new Keyboard({
//     onChange: (input, event) => onChange(input, event),
//     onKeyPress: (button) => onKeyPress(button),
//     onKeyReleased: (button) => onKeyReleased(button),
//     theme:
//       "hg-theme-default hg-layout-default text-black bg-transparent font-CaseTextRegular", // set initial css classes for the keyboard element
//     layout: {
//       default: [
//         "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
//         "{tab} q w e r t y u i o p [ ] \\",
//         "{lock} a s d f g h j k l ; ' {enter}",
//         "{shift} z x c v b n m , . / {shift}",
//         ".com @ {space}",
//       ],
//       shift: [
//         "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
//         "{tab} Q W E R T Y U I O P { } |",
//         '{lock} A S D F G H J K L : " {enter}',
//         "{shift} Z X C V B N M < > ? {shift}",
//         ".com {space}",
//       ],
//       caps: [
//         "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
//         "{tab} Q W E R T Y U I O P [ ] \\",
//         "{lock} A S D F G H J K L ; ' {enter}",
//         "{shift} Z X C V B N M , . / {shift}",
//         ".com {space}",
//       ],
//       // spanish_default: [
//       //   "\u007c 1 2 3 4 5 6 7 8 9 0 ' \u00bf {bksp}",
//       //   "{tab} q w e r t y u i o p \u0301 +",
//       //   "{lock} a s d f g h j k l \u00f1 \u007b \u007d {enter}",
//       //   "{shift} < z x c v b n m , . - {shift}",
//       //   ".com @ {space}",
//       // ],
//       // spanish_shift: [
//       //   '\u00b0 ! " # $ % & / ( ) = ? \u00a1 {bksp}',
//       //   "{tab} Q W E R T Y U I O P \u0308 *",
//       //   "{lock} A S D F G H J K L \u00d1 \u005b \u005d {enter}",
//       //   "{shift} > Z X C V B N M ; : _ {shift}",
//       //   ".com @ {space}",
//       // ],
//       // spanish_caps: [
//       //   '\u00b0 ! " # $ % & / ( ) = ? \u00a1 {bksp}',
//       //   "{tab} Q W E R T Y U I O P \u0308 *",
//       //   "{lock} A S D F G H J K L \u00d1 \u005b \u005d {enter}",
//       //   "{shift} > Z X C V B N M ; : _ {shift}",
//       //   ".com @ {space}",
//       // ],
//     },
//     excludeFromLayout: {
//       default: ["@", ".com"],
//       shift: [".com"],
//       caps: [".com"],
//       // spanish_default: ["@", ".com"],
//       // spanish_shift: [".com"],
//       // spanish_caps: [".com"],
//     },
//   });

//   setStyle();

//   // Use custom input event to trigger the word counting event listener
//   const customInputEvent = new Event("input", {
//     bubbles: true,
//     cancelable: true,
//   });

//   function onChange(input, event) {
//     checkWordLimitExport(input);

//     if (
//       wordCount.atLimit &&
//       event.target.getAttribute("data-skbtn") === "{bksp}"
//     ) {
//       // Delete a character
//       document.querySelector(".input").value = input;
//     } else if (
//       wordCount.atLimit &&
//       event.target.getAttribute("data-skbtn") !== "{bksp}"
//     ) {
//       /********************************************************************************************
//        * Do not change the input
//        *
//        * For some reason if this condition is hit the textarea has to be refocused/caret replaced?
//        * I spent nearly a whole workday on this bug was not able to figure out why.
//        ********************************************************************************************/
//     } else {
//       // Add a character
//       document.querySelector(".input").value = input;
//     }

//     // Move the caret to the correct position
//     // Otherwise the caret is set at end of string when <textarea>.value is set
//     domVars.responseFormTextArea.setSelectionRange(newCaretPos, newCaretPos);
//   }

//   let lastPressedCaretPos = 0;
//   let newCaretPos = 0;

//   function onKeyPress(button) {
//     //console.log("KeyPress");

//     // Add line break if enter key pressed
//     if (button === "{enter}") {
//       myKeyboard.setInput(document.querySelector(".input").value + "\n");
//     } else {
//       myKeyboard.setInput(document.querySelector(".input").value);
//     }

//     // Determine correct caret position
//     lastPressedCaretPos = myKeyboard.getCaretPosition();

//     if (button === "{bksp}") {
//       newCaretPos = lastPressedCaretPos - 1; // one char deleted, so left one position
//     } else {
//       newCaretPos = lastPressedCaretPos + 1; // one char added, so right one position
//     }
//   }

//   function onKeyReleased(button) {
//     //console.log("KeyReleased");

//     // Handle shift and capslock buttons
//     shiftToggle(button);
//   }

//   function shiftToggle(button) {
//     let currentLayout = myKeyboard.options.layoutName;

//     switch (button) {
//       case "{lock}":
//         // Caps lock pressed
//         if (currentLayout === "caps") {
//           setLayout("default");
//         } else {
//           setLayout("caps");
//         }
//         break;

//       case "{shift}":
//         // Shift pressed
//         if (currentLayout === "shift" || currentLayout === "caps") {
//           // Shift was most recently pressed, so toggle it off
//           setLayout("default");
//         } else {
//           setLayout("shift");
//         }
//         break;

//       default:
//         // Another button pressed (not shift or caps lock)
//         if (currentLayout === "shift") {
//           // Toggle shift off
//           setLayout("default");
//         }
//     }
//   }

//   function setLayout(layoutstring) {
//     myKeyboard.setOptions({
//       layoutName: layoutstring,
//     });

//     setStyle();
//   }

//   function setStyle() {
//     // Modify css for the keyboard element, rows direct parent
//     domVars.simpleKeyboard.classList.add("max-w-[960px]");

//     // Modify css for the individual key buttons
//     // Height can be adjusted by assigning height to each individual key, default is 40px in .hg-theme-default .hg-button
//     const keys = domVars.simpleKeyboard.querySelectorAll(".hg-button"); // returns NodeList
//     keys.forEach((key) => {
//       //key.classList.add("h-[60px]"); // for some css reason the .hg-theme-default .hg-button class takes priority over the tailwind class
//       key.style.height = "60px"; // so use inline style
//     });
//   }
// }

// export { simpleKeyboardInit, keyboardLang };
export { simpleKeyboard };
