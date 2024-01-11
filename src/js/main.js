const output = document.querySelector("#output");
const prompt = document.querySelector("#prompt");
const input = document.querySelector("#input");
const count = document.querySelector(".countBox");
const hintBox = document.querySelector(".hintBox");
const restartBox = document.querySelector(".restartBox");
const restart = document.querySelector(".restart");
const previousNums = document.querySelector(".previousNums");
const checkButton = document.querySelector(".checkButton");
const boxGame = document.querySelector(".boxGame");
let namePlayer = "";
let mainNumber = "";
let numberSmall = Math.floor(Math.random() * 10) + 1;
let numberMiddel = Math.floor(Math.random() * 100) + 1;
let numberBig = Math.floor(Math.random() * 1000) + 1;
let guesses = 0;
let numHint = 0;
let restartGame = true;
let arrNums = [];

prompt.addEventListener("submit", (event) => {
  event.preventDefault();

  processInput(input.value);
  hint(input.value);
  input.value = "";
});
/// отключаем отправку с помощью enter
function notEnter(event) {
  let check = true;
  if (event.keyCode === 13) {
    check = false;
  }
  return check;
}

/////// выбор диапозона

let smallRange = false;
let middelRange = false;
let bigRange = false;
let checkRange = document.querySelector(".checkRange");

checkRange.addEventListener("click", (e) => {
  let idRange = e.target.id;
  if (idRange === "small") {
    mainNumber = numberSmall;
    smallRange = true;
    boxGame.classList.remove("displayNone");
    checkRange.classList.add("displayNone");
    rangeMessage();
  } else if (idRange === "middel") {
    mainNumber = numberMiddel;
    middelRange = true;
    boxGame.classList.remove("displayNone");
    checkRange.classList.add("displayNone");
    rangeMessage();
  } else if (idRange === "big") {
    mainNumber = numberBig;
    bigRange = true;
    boxGame.classList.remove("displayNone");
    checkRange.classList.add("displayNone");
    rangeMessage();
  }
});

function rangeMessage() {
  if (smallRange) {
    Message(
      `Загадано число от 1 до 10. Попробуй отгадать его за наименьшее число попыток, я тебе буду помогать.`
    );
  }
  if (middelRange) {
    Message(
      `Загадано число от 1 до 100. Попробуй отгадать его за наименьшее число попыток, я тебе буду помогать.`
    );
  }
  if (bigRange) {
    Message(
      `Загадано число от 1 до 1000. Попробуй отгадать его за наименьшее число попыток, я тебе буду помогать.`
    );
  }
}

/////// создание новыx эдементов
function Message(message) {
  let li = document.createElement("li");
  li.textContent = message;
  clearOutput();
  output.appendChild(li);
}
function Count(num) {
  let p = document.createElement("p");
  p.textContent = num;
  count.appendChild(p);
}
function previous(nums) {
  let p = document.createElement("p");
  p.textContent = nums;
  previousNums.appendChild(p);
}

///////////// очистка новых элементов
function clearOutput() {
  for (let i = 0; i < output.children.length; i++) {
    output.removeChild(output.children[i]);
  }
}
function clearCount() {
  for (let i = 0; i < count.children.length; i++) {
    count.removeChild(count.children[i]);
  }
}
function clearPrevious() {
  for (let i = 0; i < previousNums.children.length; i++) {
    previousNums.removeChild(previousNums.children[i]);
  }
}
function clearHint() {
  for (let i = 0; i < hintBox.children.length; i++) {
    hintBox.removeChild(hintBox.children[i]);
  }
}
function clearRestartBox() {
  for (let i = 0; i < restartBox.children.length; i++) {
    restartBox.removeChild(restartBox.children[i]);
  }
}
/////////// проверка числа
function processInput(input) {
  if (input === "") return;

  if (restartGame) {
    let guess = Number.parseFloat(input);
    if (Number.isNaN(guess)) return;
    guesses += 1;

    if (smallRange) {
      if (guess > 10 || guess < 1) {
        Message("Число введенное вами не верно, мы загадали число от 1 до 10");
      } else if (guess > mainNumber) {
        Message("Много,попробуй ещё раз");
      } else if (guess < mainNumber) {
        Message("Мало, попробуй ещё раз");
      } else {
        Message(`Верно,это число: ${guess}! Поздравляю ты выйграл!`);
        restartGame = false;
        document.querySelector("#input").disabled = true;
        document.querySelector(".checkButton").disabled = true;
      }
    }
    if (middelRange) {
      if (guess > 100 || guess < 1) {
        Message("Число введенное вами не верно, мы загадали число от 1 до 100");
      } else if (guess > mainNumber) {
        Message("Много,попробуй ещё раз");
      } else if (guess < mainNumber) {
        Message("Мало, попробуй ещё раз");
      } else {
        Message(`Верно,это число: ${guess}! Поздравляю ты выйграл!`);
        restartGame = false;
        document.querySelector("#input").disabled = true;
        document.querySelector(".checkButton").disabled = true;
      }
    }
    if (bigRange) {
      if (guess > 1000 || guess < 1) {
        Message(
          "Число введенное вами не верно, мы загадали число от 1 до 1000"
        );
      } else if (guess > mainNumber) {
        Message("Много,попробуй ещё раз");
      } else if (guess < mainNumber) {
        Message("Мало, попробуй ещё раз");
      } else {
        Message(`Верно,это число: ${guess}! Поздравляю ты выйграл!`);
        restartGame = false;
        document.querySelector("#input").disabled = true;
        document.querySelector(".checkButton").disabled = true;
      }
    }
    checkNum();
    clearCount();
    clearPrevious();
    Count(`Число попыток: ${guesses}`);

    if (input !== "") {
      arrNums.push(input);
      previous(`Ты уже попробовал: ${arrNums.toString()}`);
    }
  }
}

// логика показа подсказки

function hint(input) {
  let guess = Number.parseFloat(input);
  if (input !== "" && guess !== mainNumber) {
    numHint++;
  }

  if (numHint === 3) {
    let p = document.createElement("p");
    p.textContent = `Подсказка: ${typeOfNum}`;
    hintBox.appendChild(p);
    console.log("work");
  }
}


let typeOfNum = "";
function checkNum() {
  if (mainNumber % 2 === 0) {
    typeOfNum = "Число чётное";
  } else {
    typeOfNum = "Число нечётное";
  }
}

// перезагрузка игры

restart.addEventListener("click", () => {
  if (restartGame === true) {
    let p = document.createElement("p");
    p.textContent = "Ты ещё не закончил игру";
    clearRestartBox();
    restartBox.appendChild(p);
  } else {
    boxGame.classList.add("displayNone");
    checkRange.classList.remove("displayNone");
    numberSmall = Math.floor(Math.random() * 10) + 1;
    numberMiddel = Math.floor(Math.random() * 100) + 1;
    numberBig = Math.floor(Math.random() * 1000) + 1;
    document.querySelector("#input").disabled = false;
    document.querySelector(".checkButton").disabled = false;
    processInput();
    clearCount();
    clearHint();
    clearRestartBox();
    clearPrevious();
    arrNums = [];
    guesses = 0;
    numHint = 0;
    restartGame = true;
  }
});
