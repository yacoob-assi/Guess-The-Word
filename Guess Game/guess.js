let words = [
  "yacoob",
  "ship",
  "gold",
  "palestine",
  "google",
  "flower",
  "strong",
  "thunder",
  "puzzle",
  "go",
];
let numberOfTries = 6;
let gameBox = document.querySelector(".game");
let tryNum = 1;
var word;
let hints = 3;
function start() {
  word = words[Math.floor(Math.random() * words.length)];

  for (let i = 1; i <= numberOfTries; i++) {
    let tryNumText = document.createElement("span");
    tryNumText.innerHTML = `Try ${i}`;

    let inputsLine = document.createElement("div");
    inputsLine.classList.add("inputsLine");
    inputsLine.appendChild(tryNumText);

    if (i != tryNum) inputsLine.classList.add("disable");
    for (let j = 0; j < word.length; j++) {
      let input = document.createElement("input");
      input.setAttribute("maxlength", "1");
      inputsLine.appendChild(input);
    }

    gameBox.append(inputsLine);
  }

  gameBox.children[0].children[1].focus();
}

document.addEventListener("input", function (event) {
  if (event.inputType !== "deleteContentBackward")
    event.target.nextElementSibling.focus();
});

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight" && event.target.tagName === "INPUT") {
    const currentInput = event.target;
    if (currentInput.nextElementSibling !== null)
      currentInput.nextElementSibling.focus();
  }

  if (event.key === "ArrowLeft" && event.target.tagName === "INPUT") {
    if (event.target.previousElementSibling.tagName === "INPUT")
      event.target.previousElementSibling.focus();
  }

  if (event.key === "Backspace" && event.target.tagName === "INPUT") {
    if (event.target.previousElementSibling.tagName === "INPUT") {
      if (event.target.value != "") event.target.value = "";
      else event.target.previousElementSibling.focus();
    }
  }

  if (event.key === "Enter" && event.target.tagName === "INPUT") {
    handleButtonClick();
  }
});

let buttons = document.querySelectorAll("button");

function handleButtonClick() {
  if (checkLine()) {
    let done = document.createElement("div");
    done.classList.add("done");
    done.innerHTML = "WOW YOU DID IT !!";
    document.querySelector(".gameBox").appendChild(done);

    this.removeEventListener("click", handleButtonClick);
    gameBox.children[tryNum - 1].classList.add("disableWithout");

    return;
  }

  if (tryNum == 6) {
    let failed = document.createElement("div");
    failed.classList.add("failed");
    failed.innerHTML = "OPPS YOU FAILED !!";

    document.querySelector(".gameBox").appendChild(failed);

    this.removeEventListener("click", handleButtonClick);

    return;
  }

  gameBox.children[tryNum].classList.remove("disable");
  gameBox.children[tryNum].children[1].focus();
  gameBox.children[tryNum - 1].classList.add("disable");
  tryNum++;
}

buttons[0].addEventListener("click", handleButtonClick);

function checkLine() {
  var saveWord = word;
  let done = true;
  for (let i = 1; i <= word.length; i++) {
    let letter = gameBox.children[tryNum - 1].children[i].value;
    console.log(letter);
    if (saveWord.includes(letter) && letter != "") {
      if (word[i - 1] === letter) {
        gameBox.children[tryNum - 1].children[i].classList.add("truePosition");
        saveWord = saveWord.replace(letter, "");
      } else {
        if (saveWord.includes(letter) && letter != "")
          gameBox.children[tryNum - 1].children[i].classList.add(
            "falsePosition"
          );
        else
          gameBox.children[tryNum - 1].children[i].classList.add("notInclude");
        saveWord = saveWord.replace(letter, "");

        done = false;
      }
    } else {
      gameBox.children[tryNum - 1].children[i].classList.add("notInclude");
      done = false;
    }

    gameBox.children[tryNum - 1].children[i].value + "   " + word[i - 1];
  }
  return done;
}

// add hints number
buttons[1].children[0].innerHTML = hints;

// hints listener
buttons[1].addEventListener("click", (event) => {
  if (hints > 0) {
    var wrong = [];
    for (let i = 1; i <= word.length; i++) {
      let letter = gameBox.children[tryNum - 1].children[i].value;
      if (word[i - 1] !== letter) wrong.push(i);
    }

    let random = wrong[Math.floor(Math.random() * wrong.length)];
    let hintLetter = word[random - 1];

    gameBox.children[tryNum - 1].children[random].value = hintLetter;
    hints--;
    buttons[1].children[0].innerHTML = hints;
  }
});
window.onload = function () {
  start();
};
