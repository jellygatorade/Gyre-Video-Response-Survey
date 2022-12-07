import { domVars } from "./global-vars-dom.js";
import { fadeIn, fadeOut } from "../common/script/fade-in-out-elements.js";
import { fadeBetweenViews } from "./fade-between-views.js";
import { introView } from "./intro-view.js";

const maxWordCount = 10;
const turnRedAtCount = 5;

const formView = {
  init: function () {
    domVars.textAreaWordsRemaining.innerText = maxWordCount.toString();
    domVars.formViewRestartIntroBtn.addEventListener(
      "click",
      this.returnToIntroView
    );
  },

  returnToIntroView: function () {
    fadeBetweenViews(domVars.formView, domVars.introView);
    introView.playIntro();
  },
};

// function formInit() {
//   domVars.textAreaWordsRemaining.innerText = maxWordCount.toString();
//   domVars.formViewRestartIntroBtn.addEventListener("click", returnToIntroView);
// }

// function returnToIntroView() {
//   fadeBetweenViews(domVars.formView, domVars.introView);
//   introView.playIntro();
// }

let wordCount = { atLimit: false };

function checkWordLimit(event) {
  const BACKSPACE = 8;
  const DELETE = 46;
  const MAX_WORDS = maxWordCount;
  const valid_keys = [BACKSPACE, DELETE];
  //let words = this.value.split(" "); // returns array of individual words in the textarea (split by space char)
  let words = this.value.split(/[\s]/); // split by regex for any whitespace character (this includes line breaks)

  //console.log(words);
  words = words.filter((entry) => entry); // removes entries that are empty strings
  //console.log(words);
  //console.log("Current words: " + words.length);

  // word limit has been reached, and key pressed was not backspace or delete
  if (words.length > MAX_WORDS && valid_keys.indexOf(event.keyCode) == -1) {
    event.preventDefault();
    words.length = MAX_WORDS;
    words.push(" "); // add trailing space
    //console.log(this.value);
    this.value = words.join(" ");
    wordCount.atLimit = true;
  } else {
    wordCount.atLimit = false;
  }

  const wordsRemaining = MAX_WORDS - words.length;

  // prevent wordsRemaining from showing as -1
  if (wordsRemaining >= 0) {
    domVars.textAreaWordsRemaining.innerText = wordsRemaining;
  } else {
    domVars.textAreaWordsRemaining.innerText = 0;
  }

  // turn count red if word count is low
  if (MAX_WORDS - words.length < turnRedAtCount + 1) {
    domVars.textAreaWordsRemaining.classList.add("text-red-500");
  } else {
    domVars.textAreaWordsRemaining.classList.remove("text-red-500");
  }
}

function checkWordLimitExport(string) {
  const BACKSPACE = 8;
  const DELETE = 46;
  const MAX_WORDS = maxWordCount;
  //const valid_keys = [BACKSPACE, DELETE];
  //let words = this.value.split(" "); // returns array of individual words in the textarea (split by space char)
  let words = string.split(/[\s]/); // split by regex for any whitespace character (this includes line breaks)

  //console.log(words);
  words = words.filter((entry) => entry); // removes entries that are empty strings
  //console.log(words);
  //console.log("Current words: " + words.length);

  // word limit has been reached, and key pressed was not backspace or delete
  if (words.length >= MAX_WORDS + 1) {
    //console.log(words.length);
    words.length = MAX_WORDS + 1;
    // words.pop(); // clear last word
    // words.push(" "); // add trailing space
    //domVars.responseFormTextArea.value = words.join(" ");
    wordCount.atLimit = true;
  } else {
    //console.log(words.length + ", not at limit");
    wordCount.atLimit = false;
  }

  const wordsRemaining = MAX_WORDS - words.length;

  // prevent wordsRemaining from showing as -1
  if (wordsRemaining >= 0) {
    domVars.textAreaWordsRemaining.innerText = wordsRemaining;
  } else {
    domVars.textAreaWordsRemaining.innerText = 0;
  }

  // turn count red if word count is low
  if (MAX_WORDS - words.length < turnRedAtCount + 1) {
    domVars.textAreaWordsRemaining.classList.add("text-red-500");
  } else {
    domVars.textAreaWordsRemaining.classList.remove("text-red-500");
  }
}

// Handles processing and storage of form data
function handleFormSubmit(event) {
  event.preventDefault();

  // Retrieve data from the form
  const data = new FormData(domVars.responseForm);
  let formJSON = Object.fromEntries(data.entries());
  //console.log(formJSON);

  // Process the from data

  // Remove leading and trailing spaces from form entries that are strings
  Object.keys(formJSON).forEach(
    (key) =>
      (formJSON[key] =
        typeof formJSON[key] === "string"
          ? formJSON[key].trim()
          : formJSON[key])
  );

  // Check for any form values that are falsey
  // Do not proceed if so
  //
  // main JS falsey values are:
  //
  // false
  // 0
  // "", '' and `` - strings of length 0
  // null
  // undefined
  // NaN
  //
  // See: https://stackoverflow.com/questions/19839952/all-falsey-values-in-javascript
  //
  let anyEmptyFormValues = false;
  Object.values(formJSON).forEach((value) => {
    if (!value) {
      anyEmptyFormValues = true;
    }
  });

  if (anyEmptyFormValues) {
    // Display a message for empty form
    console.error("One or more form entries is empty.");
    return;
  }

  console.log(formJSON);

  // Send to formspark instance
  // Documentation: https://documentation.formspark.io/examples/ajax.html#fetch
  const formEndpoints = {
    echoTest: "https://submit-form.com/echo",
    kehindeWileyResponse: "https://submit-form.com/9xJoIZjJ",
  };

  fetch(formEndpoints.echoTest, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      "Kehinde Wiley Response": formJSON.kehinde_response, // key gives name to formspark dashboard key, form data is passed here as value
    }),
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });
}

export {
  formView,
  wordCount,
  checkWordLimit,
  handleFormSubmit,
  checkWordLimitExport,
};
