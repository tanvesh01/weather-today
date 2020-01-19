console.log("Client side js is working");
// ============================
// ========= Header animation ===================

document.addEventListener("DOMContentLoaded", function(event) {
  // array with texts to type in typewriter
  var dataText = ["Weather", "Today", "Weather Today!", "That's it."];

  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i, fnCallback) {
    // chekc if text isn't finished yet
    if (i < text.length) {
      // add next character to h1
      document.querySelector("h1").innerHTML =
        text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

      // wait for a while and call this function again for next character
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback);
      }, 100);
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == "function") {
      // call callback after timeout
      setTimeout(fnCallback, 3000);
    }
  }
  // start a typewriter animation for a text in the dataText array
  function StartTextAnimation(i) {
    if (typeof dataText[i] == "undefined") {
      setTimeout(function() {
        StartTextAnimation(0);
      }, 2000);
    }
    // check if dataText[i] exists
    if (i < dataText[i].length) {
      // text exists! start typewriter animation
      typeWriter(dataText[i], 0, function() {
        // after callback (and whole text has been animated), start next text
        StartTextAnimation(i + 1);
      });
    }
  }
  // start the text animation
  StartTextAnimation(0);
});

// ============================
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
document.getElementById("spinner").style.display = "none";
weatherForm.addEventListener("submit", e => {
  document.getElementById("spinner").style.display = "block";
  e.preventDefault();

  const location = search.value;

  messageOne.innerHTML = "";
  messageTwo.textContent = "";

  fetch("/weather?address=" + encodeURIComponent(location)).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
        messageTwo.textContent = "";
      } else {
        document.getElementById("spinner").style.display = "none";
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
        console.log(messageTwo.textContent);
      }
    });
  });
});
