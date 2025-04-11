import { editBtnSvg } from "../const/editSvg.mjs";
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

      document
        .querySelector(`#match_${i}`)
        .querySelector(".playerOneScore").innerHTML = "";
      document
        .querySelector(`#match_${i}`)
        .querySelector(".playerTwoScore").innerHTML = "";

      document
        .querySelector(`#match_${i}`)
        .querySelector(".playerOneScore")
        .insertAdjacentHTML(
          "beforeend",
          `
            <input class="scoreInput">
          `
        );

      document
        .querySelector(`#match_${i}`)
        .querySelector(".playerTwoScore")
        .insertAdjacentHTML(
          "beforeend",
          `
            <input class="scoreInput">
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
          .querySelector(".playerOneScore").innerHTML = "0";
        document
          .querySelector(`#match_${i}`)
          .querySelector(".playerTwoScore").innerHTML = "0";
      });

    document
      .querySelector(`#acceptEditMatch_${i}`)
      .addEventListener("click", () => {
        editMatchScoreById(i);
        document.getElementById(`editMatch_${i}`).style.display = "block";
        document.getElementById(`acceptEditMatch_${i}`).style.display = "none";
        document.getElementById(`closeEditMatch_${i}`).style.display = "none";
      });
  }
}

function editMatchScoreById(matchId) {
  let playerOneScore = document
    .querySelector(`#match_${matchId}`)
    .querySelector(".playerOneScore")
    .querySelector(".scoreInput").value;

  let playerTwoScore = document
    .querySelector(`#match_${matchId}`)
    .querySelector(".playerTwoScore")
    .querySelector(".scoreInput").value;

  document
    .querySelector(`#match_${matchId}`)
    .querySelector(".playerOneScore").innerHTML = playerOneScore;
  document
    .querySelector(`#match_${matchId}`)
    .querySelector(".playerTwoScore").innerHTML = playerTwoScore;

  updateMatchScore(matchId, playerOneScore, playerTwoScore);
  console.log(updateMatchScore(matchId, playerOneScore, playerTwoScore));
}

function updateMatchScore(matchId, playerOneScore, playerTwoScore) {
  let playerOneName = document
    .querySelector(`#match_${matchId}`)
    .querySelector(".player1").innerText;

  let playerTwoName = document
    .querySelector(`#match_${matchId}`)
    .querySelector(".player2").innerText;

  if (playerOneScore > playerTwoScore) {
    return {
      playerOneName,
      playerTwoName,
      playerOnePoints: "3",
      playerTwoPoints: "0",
      playerOneScore,
      playerTwoScore,
    };
  }

  if (playerOneScore < playerTwoScore) {
    return {
      playerOneName,
      playerTwoName,
      playerOnePoints: "3",
      playerTwoPoints: "0",
      playerOneScore,
      playerTwoScore,
    };
  }

  if (playerOneScore == playerTwoScore) {
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

// function updateTable(){}
