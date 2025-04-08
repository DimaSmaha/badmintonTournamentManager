export function showError(element) {
  element.style.display = "inline";
  setTimeout(() => {
    element.style.display = "none";
  }, 3000);
}
