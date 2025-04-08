import locators from "../const/locators.mjs";

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

locators.addPlayer.addEventListener("click", () => {
  addNewPlayerInput();
});

locators.subtractPlayer.addEventListener("click", () => {
  removePlayerInput();
});

function addNewPlayerInput() {
  const getInputNum = locators.playersInputBox.childElementCount;
  if (getInputNum >= 256) {
    locators.notMoreThan256.style.display = "inline";
    setTimeout(() => {
      locators.notMoreThan256.style.display = "none";
    }, 3000);
  }

  if (getInputNum < 256) {
    generatePlayerInput();
    updatePlayersNumber();
  }
}

function removePlayerInput() {
  const getInputNum = locators.playersInputBox.childElementCount;
  const getLastInput = locators.playersInputBox.children[getInputNum - 1];
  if (getInputNum <= 2) {
    locators.notLessThan2.style.display = "inline";
    setTimeout(() => {
      locators.notLessThan2.style.display = "none";
    }, 3000);
  }

  if (getInputNum > 2) {
    getLastInput.remove();
    updatePlayersNumber();
  }
}
