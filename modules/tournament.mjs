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
      locators.playersMatches.insertAdjacentHTML(
        "beforeend",
        `
            <div class="match">
                <span class="player1">${player}</span>
                <div class="score">0 - 0</div>
                <span class="player2">${playersArr[ii]}</span>
                <button class="editBtn">Edit</button>
            </div>
          `
      );
    }
  }

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

// function updateTable(){}

// function updateMatchScore()
