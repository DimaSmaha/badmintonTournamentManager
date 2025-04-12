import { editBtnSvg } from "../const/editSvg.mjs";
import locators from "../const/locators.mjs";
import { getCookie } from "./cookies/cookies.mjs";

export function generateTable() {
  const playersArr = getCookie("tournamentPlayers");

  for (let i = 0; i < playersArr.length; i++) {
    locators.playersTableRows.insertAdjacentHTML(
      "beforeend",
      `
    <tr id='row_${i + 1}'>
       <td class='place'>${i + 1}</td>
       <td id='${playersArr[i]}'>${playersArr[i]}</td>
       <td class='playerMatchScore'>${0}</td>
       <td class='pointsScore'>${0}</td>
       <td class='pointsConceded'>${0}</td>
       <td class='pointsDifference'>${0}</td>
    </tr>
    `
    );
  }
}

function sortTable() {
  const tableRows = document
    .querySelector("#playersScoreboard")
    .querySelector("tbody")
    .querySelectorAll("tr");
  const tableRowsArr = [...tableRows];
  console.log(tableRowsArr);

  const sortedTableRows = tableRowsArr
    .sort(
      (a, b) => parseInt(b.cells[5].innerText) - parseInt(a.cells[5].innerText)
    )
    .sort(
      (a, b) => parseInt(b.cells[2].innerText) - parseInt(a.cells[2].innerText)
    );

  console.log(sortedTableRows);

  setTimeout(() => {
    document
      .querySelector("#playersScoreboard")
      .querySelector("tbody")
      .replaceChildren(...sortedTableRows);

    let tablePlacesLength = document
      .querySelector("#playersTableRows")
      .querySelectorAll(".place").length;
    for (let i = 0; i < tablePlacesLength; i++) {
      let currentPlace = document
        .querySelector("#playersTableRows")
        .querySelectorAll(".place")[i];
      currentPlace.innerText = "";
      currentPlace.innerText = i + 1;
    }
  }, 0);
}
// Generate for 2 matches tournament, with return match
// export function generateMatches() {
//   const playersArr = getCookie("tournamentPlayers");

//   for (let i = 0; i < playersArr.length; i++) {
//     const player = playersArr[i];

//     const filteredArr = playersArr.filter((el) => {
//       return el !== player;
//     });

//     for (let ii = 0; ii < filteredArr.length; ii++) {
//       locators.playersMatches.insertAdjacentHTML(
//         "beforeend",
//         `
//             <div class="match">
//                 <span>${player}</span>
//                 <div class="score">0 - 0</div>
//                 <span>${filteredArr[ii]}</span>
//                 <button class="editBtn">Edit</button>
//             </div>
//           `
//       );
//     }
//   }
// }

export function generateMatches() {
  const playersArr = getCookie("tournamentPlayers");

  for (let i = 0; i < playersArr.length; i++) {
    const player = playersArr[i];

    for (let ii = i + 1; ii < playersArr.length; ii++) {
      let getId = locators.playersMatches.children.length;

      locators.playersMatches.insertAdjacentHTML(
        "beforeend",
        `
            <div class="match" id="match_${getId}">
                <span class="player1">${player}</span>
                <div class="score">
                  <span class="playerOneScore">0</span>
                  <span> - </span>
                  <span class="playerTwoScore">0</span>
                </div>
                <span class="player2">${playersArr[ii]}</span>
                <button class="editBtn" id="editMatch_${getId}">${editBtnSvg}</button>
                <button class='acceptBtn' id="acceptEditMatch_${getId}">V</button>
                <button class='cancelBtn' id="closeEditMatch_${getId}">X</button>
                <button class='cancelBtn' id="resetMatch_${getId}">Res</button>
                <button class='acceptBtn' id="acceptResetMatch_${getId}">V</button>
                <button class='cancelBtn' id="cancelResetMatch_${getId}">X</button>
             </div>
          `
      );
    }
  }

  renderMatchActionButtons();

  // I firtly thought about complicated sorting to player had 1 match break
  // but then I realized that we need to include a lot of excess logic

  // let isValid = true;
  // while (isValid) {
  //   for (let i = 0; i < sortedMatchesArr.length - 1; i++) {
  //     const getName = sortedMatchesArr[i].innerText.split("\n")[0];
  //     const getNamePlusOne = sortedMatchesArr[i + 1].innerText.split("\n")[0];
  //     const getSecondName = sortedMatchesArr[i].innerText.split("\n")[2];
  //     const getSecondNamePlusOne =
  //       sortedMatchesArr[i + 1].innerText.split("\n")[2];

  //     if (getName === getNamePlusOne) {
  //       console.log("Found a match, re-sorting...");
  //       sortedMatchesArr = generatedMatchesArr.sort(() => Math.random() - 0.5);
  //       isValid = false;
  //       break;
  //     }
  //   }
  // }
}

export function randomMatchSorting() {
  const generatedMatches = locators.playersMatches.children;
  const generatedMatchesArr = [...generatedMatches];
  console.log(generatedMatchesArr);
  let sortedMatchesArr = [];

  sortedMatchesArr = generatedMatchesArr.sort(() => Math.random() - 0.5);

  setTimeout(() => {
    locators.playersMatches.replaceChildren(...sortedMatchesArr);
  }, 0);
}

function renderMatchActionButtons() {
  let getId = locators.playersMatches.children.length;
  for (let i = 0; i < getId; i++) {
    document.querySelector(`#editMatch_${i}`).addEventListener("click", () => {
      document.getElementById(`editMatch_${i}`).style.display = "none";
      document.getElementById(`acceptEditMatch_${i}`).style.display = "block";
      document.getElementById(`closeEditMatch_${i}`).style.display = "block";

      const getPlayerOneScore = document
        .querySelector(`#match_${i}`)
        .querySelector(".playerOneScore");
      const getPlayerTwoScore = document
        .querySelector(`#match_${i}`)
        .querySelector(".playerTwoScore");

      const getInitPlayerOneScore = parseInt(getPlayerOneScore.innerText);
      const getInitialPlayerTwoScore = parseInt(getPlayerTwoScore.innerText);

      getPlayerOneScore.style.display = "none";
      getPlayerTwoScore.style.display = "none";

      document
        .querySelector(`#match_${i}`)
        .querySelector(".score")
        .insertAdjacentHTML(
          "afterbegin",
          `
            <input class="scoreInput playerOneScoreInput" value='${getInitPlayerOneScore}'>
          `
        );

      document
        .querySelector(`#match_${i}`)
        .querySelector(".score")
        .insertAdjacentHTML(
          "beforeend",
          `
            <input class="scoreInput playerTwoScoreInput" value='${getInitialPlayerTwoScore}'>
          `
        );
    });

    document
      .querySelector(`#closeEditMatch_${i}`)
      .addEventListener("click", () => {
        document.getElementById(`editMatch_${i}`).style.display = "block";
        document.getElementById(`acceptEditMatch_${i}`).style.display = "none";
        document.getElementById(`closeEditMatch_${i}`).style.display = "none";

        document
          .querySelector(`#match_${i}`)
          .querySelector(".playerOneScoreInput")
          .remove();
        document
          .querySelector(`#match_${i}`)
          .querySelector(".playerTwoScoreInput")
          .remove();

        document
          .querySelector(`#match_${i}`)
          .querySelector(".playerOneScore").style.display = "";
        document
          .querySelector(`#match_${i}`)
          .querySelector(".playerTwoScore").style.display = "";
      });

    document
      .querySelector(`#acceptEditMatch_${i}`)
      .addEventListener("click", () => {
        editMatchScoreById(i);
        document.getElementById(`editMatch_${i}`).style.display = "none";
        document.getElementById(`acceptEditMatch_${i}`).style.display = "none";
        document.getElementById(`closeEditMatch_${i}`).style.display = "none";
        document.getElementById(`resetMatch_${i}`).style.display = "block";
      });

    document.querySelector(`#resetMatch_${i}`).addEventListener("click", () => {
      document.getElementById(`resetMatch_${i}`).style.display = "none";
      document.getElementById(`acceptResetMatch_${i}`).style.display = "block";
      document.getElementById(`cancelResetMatch_${i}`).style.display = "block";
    });

    document
      .querySelector(`#cancelResetMatch_${i}`)
      .addEventListener("click", () => {
        document.getElementById(`resetMatch_${i}`).style.display = "block";
        document.getElementById(`acceptResetMatch_${i}`).style.display = "none";
        document.getElementById(`cancelResetMatch_${i}`).style.display = "none";
      });

    document
      .querySelector(`#acceptResetMatch_${i}`)
      .addEventListener("click", () => {
        resetMatchScoreById(i);
        document.getElementById(`editMatch_${i}`).style.display = "block";
        document.getElementById(`resetMatch_${i}`).style.display = "none";
        document.getElementById(`acceptResetMatch_${i}`).style.display = "none";
        document.getElementById(`cancelResetMatch_${i}`).style.display = "none";
      });
  }
}

function editMatchScoreById(matchId) {
  // Check if score is 0 - 0 and then add some other logic
  // And then just update the table not create a new score

  // Decided to reset score for match and recreate it

  // let playerOneInitialScore = document
  //   .querySelector(`#match_${matchId}`)
  //   .querySelector(".playerOneScore").innerText;
  // let playerTwoInitialScore = document
  //   .querySelector(`#match_${matchId}`)
  //   .querySelector(".playerOneScore").innerText;

  // if (playerOneInitialScore == 0 && playerTwoInitialScore == 0) {
  let playerOneScore = document
    .querySelector(`#match_${matchId}`)
    .querySelector(".playerOneScoreInput").value;

  let playerTwoScore = document
    .querySelector(`#match_${matchId}`)
    .querySelector(".playerTwoScoreInput").value;

  document
    .querySelector(`#match_${matchId}`)
    .querySelector(".playerOneScore").innerHTML = parseInt(playerOneScore);
  document
    .querySelector(`#match_${matchId}`)
    .querySelector(".playerTwoScore").innerHTML = parseInt(playerTwoScore);
  document
    .querySelector(`#match_${matchId}`)
    .querySelector(".playerOneScore").style.display = "";
  document
    .querySelector(`#match_${matchId}`)
    .querySelector(".playerTwoScore").style.display = "";
  document
    .querySelector(`#match_${matchId}`)
    .querySelector(".playerOneScoreInput")
    .remove();
  document
    .querySelector(`#match_${matchId}`)
    .querySelector(".playerTwoScoreInput")
    .remove();

  let infoForTable = updateMatchScore(matchId, playerOneScore, playerTwoScore);
  updateTable(infoForTable);
  // }
}

function updateMatchScore(matchId, playerOneScore, playerTwoScore) {
  let playerOneName = document
    .querySelector(`#match_${matchId}`)
    .querySelector(".player1").innerText;

  let playerTwoName = document
    .querySelector(`#match_${matchId}`)
    .querySelector(".player2").innerText;

  if (parseInt(playerOneScore) > parseInt(playerTwoScore)) {
    return {
      playerOneName,
      playerTwoName,
      playerOnePoints: "3",
      playerTwoPoints: "0",
      playerOneScore,
      playerTwoScore,
    };
  }

  if (parseInt(playerOneScore) < parseInt(playerTwoScore)) {
    return {
      playerOneName,
      playerTwoName,
      playerOnePoints: "0",
      playerTwoPoints: "3",
      playerOneScore,
      playerTwoScore,
    };
  }

  if (parseInt(playerOneScore) == parseInt(playerTwoScore)) {
    return {
      playerOneName,
      playerTwoName,
      playerOnePoints: "1",
      playerTwoPoints: "1",
      playerOneScore,
      playerTwoScore,
    };
  }
}

function resetMatchScoreById(matchId) {
  let infoForTable = updateResetMatchScoreById(matchId);
  updateTable(infoForTable);

  document
    .querySelector(`#match_${matchId}`)
    .querySelector(".playerOneScore").innerHTML = 0;
  document
    .querySelector(`#match_${matchId}`)
    .querySelector(".playerTwoScore").innerHTML = 0;
  document.getElementById(`editMatch_${matchId}`).style.display = "block";
}

function updateResetMatchScoreById(matchId) {
  let playerOneName = document
    .querySelector(`#match_${matchId}`)
    .querySelector(".player1").innerText;
  let playerTwoName = document
    .querySelector(`#match_${matchId}`)
    .querySelector(".player2").innerText;
  let playerOneScoreReset = document
    .querySelector(`#match_${matchId}`)
    .querySelector(".playerOneScore").innerText;
  let playerTwoScoreReset = document
    .querySelector(`#match_${matchId}`)
    .querySelector(".playerTwoScore").innerText;

  if (parseInt(playerOneScoreReset) > parseInt(playerTwoScoreReset)) {
    const playerOneScore = -playerOneScoreReset;
    const playerTwoScore = -playerTwoScoreReset;

    return {
      playerOneName,
      playerTwoName,
      playerOnePoints: -3,
      playerTwoPoints: 0,
      playerOneScore,
      playerTwoScore,
    };
  }

  if (parseInt(playerOneScoreReset) < parseInt(playerTwoScoreReset)) {
    const playerOneScore = -playerOneScoreReset;
    const playerTwoScore = -playerTwoScoreReset;

    return {
      playerOneName,
      playerTwoName,
      playerOnePoints: 0,
      playerTwoPoints: -3,
      playerOneScore,
      playerTwoScore,
    };
  }

  if (parseInt(playerOneScoreReset) == parseInt(playerTwoScoreReset)) {
    const playerOneScore = -playerOneScoreReset;
    const playerTwoScore = -playerTwoScoreReset;

    return {
      playerOneName,
      playerTwoName,
      playerOnePoints: -1,
      playerTwoPoints: -1,
      playerOneScore,
      playerTwoScore,
    };
  }
}

function updateTable(infoForTable) {
  const data = infoForTable;
  console.log(data);

  const getPlayerOneCell = document
    .querySelector("#playersScoreboard")
    .querySelector(`#${data.playerOneName}`);
  const getPlayerOneScore = getPlayerOneCell.nextElementSibling;
  const getPlayerOnePointsScored =
    getPlayerOneCell.nextElementSibling.nextElementSibling;
  const getPlayerOnePointsCondenced =
    getPlayerOneCell.nextElementSibling.nextElementSibling.nextElementSibling;
  const getPlayerOnePointsDifference =
    getPlayerOneCell.nextElementSibling.nextElementSibling.nextElementSibling
      .nextElementSibling;

  const getPlayerTwoCell = document
    .querySelector("#playersScoreboard")
    .querySelector(`#${data.playerTwoName}`);

  const getPlayerTwoScore = getPlayerTwoCell.nextElementSibling;
  const getPlayerTwoPointsScored =
    getPlayerTwoCell.nextElementSibling.nextElementSibling;
  const getPlayerTwoPointsCondenced =
    getPlayerTwoCell.nextElementSibling.nextElementSibling.nextElementSibling;
  const getPlayerTwoPointsDifference =
    getPlayerTwoCell.nextElementSibling.nextElementSibling.nextElementSibling
      .nextElementSibling;

  const setNewScore = (el, newScore) =>
    (el.innerText = parseInt(el.innerText) + parseInt(newScore));

  setNewScore(getPlayerOneScore, data.playerOnePoints);
  setNewScore(getPlayerOnePointsScored, data.playerOneScore);
  setNewScore(getPlayerOnePointsCondenced, data.playerTwoScore);
  setNewScore(
    getPlayerOnePointsDifference,
    parseInt(data.playerOneScore - data.playerTwoScore)
  );

  setNewScore(getPlayerTwoScore, data.playerTwoPoints);
  setNewScore(getPlayerTwoPointsScored, data.playerTwoScore);
  setNewScore(getPlayerTwoPointsCondenced, data.playerOneScore);
  setNewScore(
    getPlayerTwoPointsDifference,
    parseInt(data.playerTwoScore - data.playerOneScore)
  );

  sortTable();
}
