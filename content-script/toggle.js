import { getColors, makeBackgroundColor } from "./highlight";

const colorMap = {};

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

  if (!colorMap[keyword]) {
    colorMap[keyword] = color;
  }

  Array.from(elements).forEach((element) => {
    element.style.setProperty("background", colorMap[keyword]);
  });
}

export function applyHighlightAll(keywords) {
  const colors = getColors(keywords.length, makeBackgroundColor);

  for (let i = 0; i < keywords.length; i += 1) {
    const keyword = keywords[i];

    if (!colorMap[keyword]) {
      colorMap[keyword] = colors[i];
    }

    const elements = document.querySelectorAll(`[data-highlight="${keyword}"]`);

    Array.from(elements).forEach((element) => {
      element.style.setProperty("background", colorMap[keyword]);
    });
  }
}
