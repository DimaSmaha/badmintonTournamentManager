import locators from "./const/locators.mjs";
import {
  addNewPlayerInput,
  continueTournamentIfExists,
  generateInitialInputs,
  getPlayersInputsValues,
  removePlayerInput,
} from "./modules/playerInputs.mjs";
import { generateMatches, generateTable } from "./modules/tournament.mjs";

window.onload = function () {
  if (document.title == "Generate Tournament") {
    continueTournamentIfExists();
    generateInitialInputs();
  }
  if (document.title == "Tournament") {
    generateTable();
    generateMatches();
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
