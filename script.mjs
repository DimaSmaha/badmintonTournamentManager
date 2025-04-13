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
  renderResultsIfExists,
  resetTournamentData,
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
    resetTournamentData();
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
