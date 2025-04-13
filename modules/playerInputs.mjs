import locators from "../const/locators.mjs";
import { showError } from "../const/showError.mjs";
import { deleteCookie, getCookie, setCookie } from "./cookies/cookies.mjs";

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

export function resetDataIfExists() {
  if (getCookie("tournamentPlayers") || getCookie("matchesData")) {
    locators.navbar.insertAdjacentHTML(
      "beforeend",
      `
      <a href='#' id="resetDataBtn">Reset Tournament Data</a>
      <button class='acceptBtn' id="acceptResetData">V</button>
      <button class='cancelBtn' id="closeResetData">X</button>
      `
    );

    document.querySelector(`#resetDataBtn`).addEventListener("click", () => {
      document.getElementById(`resetDataBtn`).style.display = "inline";
      document.getElementById(`acceptResetData`).style.display = "inline";
      document.getElementById(`closeResetData`).style.display = "inline";
    });

    document.querySelector("#acceptResetData").addEventListener("click", () => {
      deleteCookie("tournamentPlayers");
      deleteCookie("matchesData");

      window.location.reload();
    });

    document.querySelector(`#closeResetData`).addEventListener("click", () => {
      document.getElementById(`resetDataBtn`).style.display = "inline";
      document.getElementById(`acceptResetData`).style.display = "none";
      document.getElementById(`closeResetData`).style.display = "none";
    });
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
    if (inputValuesArr.includes(inputValue.trim())) {
      showError(locators.canNotHaveTheSameName);
      return;
    }

    inputValuesArr.push(inputValue);
  }

  setCookie("tournamentPlayers", inputValuesArr);
  setCookie("matchesData", {});
  window.location.replace("../pages/tournament.html");
}
