import { editBtnSvg } from "./../const/editSvg.mjs";
import locators from "./../const/locators.mjs";
import { showError } from "./../const/showError.mjs";
import { deleteCookie, getCookie, setCookie } from "./cookies/cookies.mjs";

export function generateTable() {
  const playersArr = getCookie("tournamentPlayers");

  for (let i = 0; i < playersArr.length; i++) {
    locators.playersTableRows.insertAdjacentHTML(
      "beforeend",
      `
    <tr id='row_${i + 1}'>
       <td class='place'>${i + 1}</td>
       <td class='name' id='${playersArr[i]}'>${playersArr[i]}</td>
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

      // To make inputs clear
      // if (getInitPlayerOneScore == 0 && getInitialPlayerTwoScore == 0) {
      //   getInitPlayerOneScore = "";
      //   getInitialPlayerTwoScore = "";
      // }

      getPlayerOneScore.style.display = "none";
      getPlayerTwoScore.style.display = "none";

      document
        .querySelector(`#match_${i}`)
        .querySelector(".score")
        .insertAdjacentHTML(
          "afterbegin",
          `
            <input class="scoreInput playerOneScoreInput" type='number' value='${getInitPlayerOneScore}'>
          `
        );

      document
        .querySelector(`#match_${i}`)
        .querySelector(".score")
        .insertAdjacentHTML(
          "beforeend",
          `
            <input class="scoreInput playerTwoScoreInput" type='number' value='${getInitialPlayerTwoScore}'>
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
        setTimeout(() => {
          checkCongratulateTheWinner();
        }, 0);
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

  let minPoints = getMinPointsCookie();

  if (
    playerOneScore < minPoints &&
    playerTwoScore < minPoints &&
    !(playerOneScore > minPoints && playerTwoScore > minPoints)
  ) {
    document.getElementById("wrongScoreErrorPoints").innerText = ``;
    document.getElementById(
      "wrongScoreErrorPoints"
    ).innerText = ` ${minPoints} points`;

    showError(document.getElementById("wrongScoreError"));
    setTimeout(() => {
      document.getElementById(`acceptEditMatch_${matchId}`).style.display =
        "block";
      document.getElementById(`closeEditMatch_${matchId}`).style.display =
        "block";
      document.getElementById(`resetMatch_${matchId}`).style.display = "none";
    }, 0);

    return;
  }

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
    const matchData = {
      matchId,
      playerOneName,
      playerTwoName,
      playerOneScore,
      playerTwoScore,
      playerOnePoints: "3",
      playerTwoPoints: "0",
    };

    updateMatchCookies(matchData);
    return matchData;
  }

  if (parseInt(playerOneScore) < parseInt(playerTwoScore)) {
    const matchData = {
      matchId,
      playerOneName,
      playerTwoName,
      playerOneScore,
      playerTwoScore,
      playerOnePoints: "0",
      playerTwoPoints: "3",
    };

    updateMatchCookies(matchData);
    return matchData;
  }

  if (parseInt(playerOneScore) == parseInt(playerTwoScore)) {
    const matchData = {
      matchId,
      playerOneName,
      playerTwoName,
      playerOneScore,
      playerTwoScore,
      playerOnePoints: "1",
      playerTwoPoints: "1",
    };

    updateMatchCookies(matchData);
    return matchData;
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

  resetCookieByMatchId(matchId);
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

function updateMatchCookies(data) {
  if (!getCookie("matchesData")) {
    setCookie("matchesData", {});
  }

  if (getCookie("matchesData")) {
    let matchesInfoObj = getCookie("matchesData");

    console.log(data);
    matchesInfoObj[`match_${data.matchId}`] = {
      playerOneName: data.playerOneName,
      playerTwoName: data.playerTwoName,
      playerOneScore: data.playerOneScore,
      playerTwoScore: data.playerTwoScore,
      playerOnePoints: data.playerOnePoints,
      playerTwoPoints: data.playerTwoPoints,
    };
    setCookie("matchesData", matchesInfoObj);
  }
}

function resetCookieByMatchId(matchId) {
  if (getCookie("matchesData")) {
    let dataObj = getCookie("matchesData");
    console.log(dataObj);
    delete dataObj[`match_${matchId}`];
    console.log(dataObj);

    setCookie("matchesData", dataObj);
  }
}

export function renderResultsIfExists() {
  if (getCookie("matchesData")) {
    let data = getCookie("matchesData");

    for (let i = 0; i <= Object.keys(data).length; i++) {
      console.log(data[`match_${1}`]);
      if (data[`match_${i}`]) {
        document
          .querySelector(`#match_${i}`)
          .querySelector(".playerOneScore").innerText = parseInt(
          data[`match_${i}`].playerOneScore
        );
        document
          .querySelector(`#match_${i}`)
          .querySelector(".playerTwoScore").innerText = parseInt(
          data[`match_${i}`].playerTwoScore
        );
        document.getElementById(`editMatch_${i}`).style.display = "none";
        document.getElementById(`resetMatch_${i}`).style.display = "block";

        const dataForTable = data[`match_${i}`];
        updateTable(dataForTable);
      }
      continue;
    }

    // if you dont want to see the alert after each tournament page visit or reload, simply comment
    setTimeout(() => {
      checkCongratulateTheWinner();
    }, 0);
  }

  if (!getCookie("matchesData")) {
    return;
  }
}

export function renderActionHeaderButtons() {
  document
    .querySelector(`#resetTournamentDataBtn`)
    .addEventListener("click", () => {
      document.getElementById(`resetTournamentDataBtn`).style.display =
        "inline";
      document.getElementById(`acceptResetTournamentData`).style.display =
        "inline";
      document.getElementById(`closeResetTournamentData`).style.display =
        "inline";
    });

  document
    .querySelector("#acceptResetTournamentData")
    .addEventListener("click", () => {
      deleteCookie("matchesData");
      deleteCookie("minPoints");

      window.location.reload();
    });

  document
    .querySelector(`#closeResetTournamentData`)
    .addEventListener("click", () => {
      document.getElementById(`resetTournamentDataBtn`).style.display =
        "inline";
      document.getElementById(`acceptResetTournamentData`).style.display =
        "none";
      document.getElementById(`closeResetTournamentData`).style.display =
        "none";
    });

  document
    .querySelector(`#finishTournamentEarlyBtn`)
    .addEventListener("click", () => {
      document.getElementById(`finishTournamentEarlyBtn`).style.display =
        "inline";
      document.getElementById(`acceptFinishTournamentEarly`).style.display =
        "inline";
      document.getElementById(`closeFinishTournamentEarly`).style.display =
        "inline";
    });

  document
    .querySelector("#acceptFinishTournamentEarly")
    .addEventListener("click", () => {
      document.getElementById(`acceptFinishTournamentEarly`).style.display =
        "none";
      document.getElementById(`closeFinishTournamentEarly`).style.display =
        "none";
      congratulateTheWinner();
    });

  document
    .querySelector(`#closeFinishTournamentEarly`)
    .addEventListener("click", () => {
      document.getElementById(`finishTournamentEarlyBtn`).style.display =
        "inline";
      document.getElementById(`acceptFinishTournamentEarly`).style.display =
        "none";
      document.getElementById(`closeFinishTournamentEarly`).style.display =
        "none";
    });

  document
    .querySelector(`#changeMinPointsBtn`)
    .addEventListener("click", () => {
      document.getElementById(`changeMinPointsBtn`).style.display = "none";
      document.getElementById(`changeMinPointsInput`).style.display = "inline";
      document.getElementById(`acceptChangeMinPoints`).style.display = "inline";
      document.getElementById(`closeChangeMinPoints`).style.display = "inline";
    });

  document
    .querySelector("#acceptChangeMinPoints")
    .addEventListener("click", () => {
      changeMinPointsCookie();
    });

  document
    .querySelector(`#closeChangeMinPoints`)
    .addEventListener("click", () => {
      document.getElementById(`changeMinPointsBtn`).style.display = "inline";
      document.getElementById(`changeMinPointsInput`).style.display = "none";
      document.getElementById(`acceptChangeMinPoints`).style.display = "none";
      document.getElementById(`closeChangeMinPoints`).style.display = "none";
    });
}

let congratulatedFlag = false;

function checkCongratulateTheWinner() {
  if (getCookie("matchesData")) {
    const data = getCookie("matchesData");
    const finishedMatchesLength = Object.keys(data).length;
    const totalMatchesLength =
      document.querySelector("#playersMatches").children.length;

    console.log(finishedMatchesLength, totalMatchesLength);

    if (finishedMatchesLength == totalMatchesLength) {
      congratulateTheWinner();
    }
  }
}

console.log("congratulatedFlag", congratulatedFlag);

function congratulateTheWinner() {
  const getFirstPlace = document.querySelector("#playersTableRows").children[0];
  const getSecondPlace =
    document.querySelector("#playersTableRows").children[1];
  const getThirdPlace = document.querySelector("#playersTableRows").children[2];

  function getPlayerData(playerFromTable) {
    const getPlayerName = playerFromTable.querySelector(".name").innerText;
    const getPlayerScore =
      playerFromTable.querySelector(".playerMatchScore").innerText;
    const getPlayerPointsDifference =
      playerFromTable.querySelector(".pointsDifference").innerText;

    return { getPlayerName, getPlayerScore, getPlayerPointsDifference };
  }

  const getFirstPlacePlayerInfo = getPlayerData(getFirstPlace);
  const getSecondPlacePlayerInfo = getPlayerData(getSecondPlace);
  const getThirdPlacePlayerInfo = getPlayerData(getThirdPlace);

  const generateMessage = `
  WINNER WINNER CHICKEN DINNER🎉🎉🎉

  LETS CONGRATULATE THE WINNER OF THE TOURNAMENT - ${getFirstPlacePlayerInfo.getPlayerName}. 
  He scored ${getFirstPlacePlayerInfo.getPlayerScore} points, and got ${getFirstPlacePlayerInfo.getPlayerPointsDifference} point difference.
  WELL DONE

  Also the honorable mension for our silver competiton - ${getSecondPlacePlayerInfo.getPlayerName}
  Who scored ${getSecondPlacePlayerInfo.getPlayerScore} points, and got ${getSecondPlacePlayerInfo.getPlayerPointsDifference} point difference.

  And lastly the bronze prize goes to - ${getThirdPlacePlayerInfo.getPlayerName}
  Who scored ${getThirdPlacePlayerInfo.getPlayerScore} points, and got ${getThirdPlacePlayerInfo.getPlayerPointsDifference} point difference.
  `;

  if (congratulatedFlag == false) {
    alert(generateMessage);
    congratulatedFlag = true;
  }

  return;
}

export function setMinPointsCookie() {
  if (!getCookie("minPoints")) {
    const minPoints = 11;

    setCookie("minPoints", minPoints);
  }

  return;
}

function getMinPointsCookie() {
  if (getCookie("minPoints")) {
    const getMinPoints = getCookie("minPoints");

    return parseInt(getMinPoints);
  }
  return 11;
}

function changeMinPointsCookie() {
  if (getCookie("minPoints")) {
    const getNewPointsInputValue = document.getElementById(
      "changeMinPointsInput"
    ).value;

    if (getNewPointsInputValue < 1 || getNewPointsInputValue == "") {
      document.getElementById("changeMinPointsInput").value = "";
      showError(document.getElementById("wrongMinPointsMin"));
      return;
    }
    if (getNewPointsInputValue >= 22) {
      document.getElementById("changeMinPointsInput").value = "";
      showError(document.getElementById("wrongMinPointsMax"));
      return;
    }

    if (typeof parseInt(getNewPointsInputValue) == "number") {
      setCookie("minPoints", parseInt(getNewPointsInputValue));
      showError(document.getElementById("newMinPointsAdded"));
      document.getElementById(`changeMinPointsBtn`).style.display = "inline";
      document.getElementById(`changeMinPointsInput`).style.display = "none";
      document.getElementById(`acceptChangeMinPoints`).style.display = "none";
      document.getElementById(`closeChangeMinPoints`).style.display = "none";
    }
  }
}
