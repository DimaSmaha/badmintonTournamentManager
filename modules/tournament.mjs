import locators from "../const/locators.mjs";
import { getCookie } from "./cookies/cookies.mjs";

export function generateTable() {
  const playersArr = getCookie("tournamentPlayers");

  for (let i = 0; i < playersArr.length; i++) {
    locators.playersTableRows.insertAdjacentHTML(
      "beforebegin",
      `
    <tr>
       <td>${i + 1}</td>
       <td>${playersArr[i]}</td>
       <td>${0}</td>
       <td>${0}</td>
       <td>${0}</td>
    </tr>
    `
    );
  }
}

export function generateMatches() {
  const playersArr = getCookie("tournamentPlayers");

  for (let i = 0; i < playersArr.length; i++) {
    const player = playersArr[i];

    const filteredArr = playersArr.filter((el) => {
      return el !== player;
    });

    for (let ii = 0; ii < filteredArr.length; ii++) {
      locators.playersMatches.insertAdjacentHTML(
        "beforeend",
        `
            <div class="match">
                <span>${player}</span>
                <div class="score">0 - 0</div>
                <span>${filteredArr[ii]}</span>
                <button class="editBtn">Edit</button>
            </div>
          `
      );
    }
  }
}

// function updateTable(){}

// function updateMatchScore()
