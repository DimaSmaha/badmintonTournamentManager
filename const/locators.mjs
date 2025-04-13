class Locators {
  constructor() {
    this.playersInputBox = document.querySelector("#playersInputBox");
    this.playersNumberCounter = document.querySelector("#playersNumber");
    this.addPlayer = document.querySelector("#addPlayer");
    this.subtractPlayer = document.querySelector("#subtractPlayer");
    this.canNotBeEmpty = document.querySelector("#canNotBeEmpty");
    this.notLessThan2 = document.querySelector("#notLessThan2");
    this.notMoreThan256 = document.querySelector("#notMoreThan256");
    this.canNotBeEmpty = document.querySelector("#canNotBeEmpty");
    this.generateTournamentBtn = document.querySelector("#generateTournament");
    this.navbar = document.querySelector(".navbar");
    this.playersTableRows = document.querySelector("#playersTableRows");
    this.playersMatches = document.querySelector("#playersMatches");
    this.canNotHaveTheSameName = document.querySelector(
      "#canNotHaveTheSameName"
    );
  }
}

export default new Locators();
