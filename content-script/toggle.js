export function getExistingColor(element) {
  return element.style.getPropertyValue("background");
}

export function turnOffHighlight(keyword) {
  const elements = document.querySelectorAll(`[data-highlight="${keyword}"]`);

  Array.from(elements).forEach((element) => {
    element.style.removeProperty("background");
  });
}

export function applyHighlight(keyword, color) {
  const elements = document.querySelectorAll(`[data-highlight="${keyword}"]`);

  Array.from(elements).forEach((element) => {
    element.style.setProperty("background", color);
  });
}
