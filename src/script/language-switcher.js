import { domVars } from "./global-vars-dom.js";

const languageSwitcher = {
  toggleLangBtns: [],

  init: function () {
    // Create the language controls on the language toggle buttons
    this.toggleLangBtns.push(
      domVars.introToggleLangButton,
      domVars.formToggleLangButton
    );

    // "this" keyword needs to be set as the parent object (languageSwitcher), because "this" depends on execution context
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
    // I have to do this twice here, first for this.applyLangauge and second for langSwitchBtnAction
    const applyLanguage = this.applyLanguage.bind(this);

    let langSwitchBtnAction = function () {
      applyLanguage(this.lang.langSwitch);
    };
    langSwitchBtnAction = langSwitchBtnAction.bind(this);

    this.toggleLangBtns.forEach((button) => {
      button.addEventListener("click", langSwitchBtnAction);
    });
  },

  // Start in english by default
  lang: { langState: "en", langSwitch: "es" },

  // Define a function that will control the language state variables
  setLanguage: function (choice) {
    if (choice === "en") {
      this.lang.langState = "en";
      localStorage.setItem("langState", this.lang.langState);
      this.lang.langSwitch = "es";
      return;
    }
    if (choice === "es") {
      this.lang.langState = "es";
      localStorage.setItem("langState", this.lang.langState);
      this.lang.langSwitch = "en";
      return;
    }
  },

  applyLanguage: function (choice) {
    this.setLanguage(choice);

    // Maybe it's not ideal to query for these every time the button is pressed
    // But if there are any removed or added to the DOM dynamically
    // They have to be included in their respective "en" or "es" NodeList at some point for this function to apply to them
    let enNodeList = document.querySelectorAll('[lang="en"]');
    let esNodeList = document.querySelectorAll('[lang="es"]');

    if (choice === "en") {
      this.toggleLangBtns.forEach((button) => {
        button.innerText = "Español";
      });

      enNodeList.forEach(function (node) {
        // Fall back on default stylesheet for display
        // This handles the differences between elements that should be "block" and those that should be "inline"
        node.style.display = null;
      });
      esNodeList.forEach(function (node) {
        node.style.display = "none";
      });
    } else if (choice === "es") {
      this.toggleLangBtns.forEach((button) => {
        button.innerText = "English";
      });

      esNodeList.forEach(function (node) {
        // Fall back on default stylesheet for display
        // This handles the differences between elements that should be "block" and those that should be "inline"
        node.style.display = null;
      });
      enNodeList.forEach(function (node) {
        node.style.display = "none";
      });
    }
  },
};

export { languageSwitcher };
