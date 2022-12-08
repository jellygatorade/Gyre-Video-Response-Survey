import { domVars } from "./global-vars-dom.js";
import { fadeOut } from "../common/script/fade-in-out-elements.js";
import { submitForm } from "./handle-form-input.js";

const formConfirmationModal = {
  init: function () {
    domVars.formConfirmationConfirmButton.addEventListener(
      "click",
      this.confirmButtonAction
    );

    domVars.formConfirmationModalOverlay.addEventListener(
      "click",
      this.fadeOutModal
    );

    domVars.formConfirmationBackButton.addEventListener(
      "click",
      this.fadeOutModal
    );
  },

  fadeOutModal: function (event) {
    event.stopPropagation();
    fadeOut(domVars.formConfirmationModal);
  },

  populate: function (formJSON) {
    // \n "new line" is not compatible with innerHTML so replace with <br>
    let fixedLineBreaks = formJSON.kehinde_response.replace(
      /(?:\r\n|\r|\n)/g,
      "<br />"
    );
    domVars.formConfirmationReplicatedInput.innerHTML = fixedLineBreaks;
  },

  confirmButtonAction: function (event) {
    event.currentTarget.disabled = true;
    submitForm();
  },
};

export { formConfirmationModal };
