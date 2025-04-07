import { generateInitialInputs } from "./modules/playerInputs.mjs";

window.onload = function () {
  if (document.title == "Generate Tournament") {
    generateInitialInputs();
  }
  if (document.title == "Saved Dishes") {
  }
};

// if (document.title == "Dish Calorie Counter") {
//   loc.getDishCaloriesBtn.addEventListener("click", () => {
//     renderDishNutritions();
//   });
// }
