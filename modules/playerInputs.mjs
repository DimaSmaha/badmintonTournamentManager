import locators from "../const/locators.mjs";
import { showError } from "../const/showError.mjs";
import { getCookie, setCookie } from "./cookies/cookies.mjs";

export function continueTournamentIfExists() {
  console.log(getCookie("tournamentPlayers"));

  if (getCookie("tournamentPlayers")) {
    locators.navbar.insertAdjacentHTML(
      "beforeend",
      `
    <a href="./pages/tournament.html">Continue Tournament</a>
    `
    );
  }
}

function generatePlayerInput() {
  locators.playersInputBox.insertAdjacentHTML(
    "beforeend",
    `
    <input type="text" class="playerNameInput" placeholder="Enter Player Name" /> 
    `
  );
}

function updatePlayersNumber() {
  const getPlayersNumber = locators.playersInputBox.children.length;
  locators.playersNumberCounter.innerText = getPlayersNumber;
}

export function generateInitialInputs() {
  generatePlayerInput();
  generatePlayerInput();
  updatePlayersNumber();
}

export function addNewPlayerInput() {
  const getInputNum = locators.playersInputBox.childElementCount;
  if (getInputNum >= 256) {
    showError(locators.notMoreThan256);
  }

  if (getInputNum < 256) {
    generatePlayerInput();
    updatePlayersNumber();
  }
}

export function removePlayerInput() {
  const getInputNum = locators.playersInputBox.childElementCount;
  const getLastInput = locators.playersInputBox.children[getInputNum - 1];
  if (getInputNum <= 2) {
    showError(locators.notLessThan2);
  }

  if (getInputNum > 2) {
    getLastInput.remove();
    updatePlayersNumber();
  }
}

export function getPlayersInputsValues() {
  const getInputNum = locators.playersInputBox.childElementCount;

  const inputValuesArr = [];
  for (let i = 0; i < getInputNum; i++) {
    const inputValue = locators.playersInputBox.children[i].value;

    if (inputValue.trim() == "") {
      showError(locators.canNotBeEmpty);
      return;
    }
    //check that we dont have the same player names

    inputValuesArr.push(inputValue);
  }

  setCookie("tournamentPlayers", inputValuesArr);
  window.location.replace("../pages/tournament.html");
}
