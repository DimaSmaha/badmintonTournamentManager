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
  //set no more then 256
  generatePlayerInput();
  updatePlayersNumber();
}

function removePlayerInput() {
  const getInputNum = locators.playersInputBox.childElementCount;
  const getLastInput = locators.playersInputBox.children[getInputNum - 1];
  if (getInputNum <= 2) {
    console.log("can not delete");
    setTimeout(() => {
      //   locators.notLessThan2.st; // write errors
    }, 3000);
  }

  if (getInputNum > 2) {
    getLastInput.remove();
    updatePlayersNumber();
  }
}
