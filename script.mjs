import locators from "./const/locators.mjs";
import {
  addNewPlayerInput,
  continueTournamentIfExists,
  generateInitialInputs,
  getPlayersInputsValues,
  removePlayerInput,
  resetDataIfExists,
} from "./modules/playerInputs.mjs";
import {
  generateMatches,
  generateTable,
  renderActionHeaderButtons,
  renderResultsIfExists,
  setMinPointsCookie,
} from "./modules/tournament.mjs";

window.onload = function () {
  if (document.title == "Generate Tournament") {
    continueTournamentIfExists();
    resetDataIfExists();
    generateInitialInputs();
  }
  if (document.title == "Tournament") {
    generateTable();
    generateMatches();
    renderResultsIfExists();
    renderActionHeaderButtons();
    setMinPointsCookie();
  }
};

if (document.title == "Generate Tournament") {
  locators.addPlayer.addEventListener("click", () => {
    addNewPlayerInput();
  });

  locators.subtractPlayer.addEventListener("click", () => {
    removePlayerInput();
  });

  locators.generateTournamentBtn.addEventListener("click", () => {
    getPlayersInputsValues();
  });
}
