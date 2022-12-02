import { domVars } from "./global-vars-dom.js";

function applyContent(data) {
  // Timeout Modal
  domVars.enTimeoutQuestion.innerHTML = data.en.general.timeout.question;
  domVars.enTimeoutInstruction.innerHTML = data.en.general.timeout.instruction;

  domVars.esTimeoutQuestion.innerHTML = data.es.general.timeout.question;
  domVars.esTimeoutInstruction.innerHTML = data.es.general.timeout.instruction;

  // Main
  // domVars.enHomeHeading.innerHTML = data.en.main.heading;
  // domVars.esHomeHeading.innerHTML = data.es.main.heading;
  // domVars.enHomeIntroText.innerHTML = data.en.main.body;
  // domVars.esHomeIntroText.innerHTML = data.es.main.body;
}

export { applyContent };
