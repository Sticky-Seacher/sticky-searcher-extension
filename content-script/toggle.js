import { getColors } from "./highlight";

export function getExistingColor(element) {
  return element.style.getPropertyValue("background");
}

export function turnOffHighlight(keyword) {
  const elements = document.querySelectorAll(`[data-highlight="${keyword}"]`);

  Array.from(elements).forEach((element) => {
    element.style.removeProperty("background");
  });
}

export function turnOffHighlightAll() {
  const elements = document.querySelectorAll(`[data-highlight]`);

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

export function applyHighlightAll(keywords) {
  const colors = getColors(keywords.length);

  for (let i = 0; i < keywords.length; i += 1) {
    const elements = document.querySelectorAll(
      `[data-highlight="${keywords[i]}"]`
    );

    Array.from(elements).forEach((element) => {
      element.style.setProperty("background", colors[i]);
    });
  }
}
