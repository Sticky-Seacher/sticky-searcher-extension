export const BACKGROUND_COLORS = [
  "#dac8ff",
  "#CFF09E",
  "#A8DBA8",
  "#D7FFF1",
  "#ffdb9d",
  "#DDDDDD",
  "#FADAD8",
  "#b0dcff",
];

export function getColors(numberOfColorsNeeded) {
  return Array.from({ length: numberOfColorsNeeded }, (_, index) => {
    return BACKGROUND_COLORS[index % BACKGROUND_COLORS.length];
  });
}

export function setHighlight(keyword, targetElement, color) {
  const textNodeIterator = document.createNodeIterator(
    targetElement,
    NodeFilter.SHOW_TEXT
  );

  for (
    let currentTextNode = textNodeIterator.nextNode();
    currentTextNode;
    currentTextNode = textNodeIterator.nextNode()
  ) {
    const parentElement = currentTextNode.parentElement;

    if (
      parentElement.tagName.toLowerCase() === "input" ||
      parentElement.tagName.toLowerCase() === "textarea"
    ) {
      continue;
    }

    const text = currentTextNode.textContent;
    const splitted = text.split(keyword);

    splitted.forEach((stringFragment, index) => {
      const notKeywordText = document.createTextNode(stringFragment);
      parentElement.insertBefore(notKeywordText, currentTextNode);

      if (index !== splitted.length - 1) {
        const highlightedSpan = document.createElement("span");
        highlightedSpan.textContent = keyword;
        highlightedSpan.style = `background:${color}`;
        highlightedSpan.dataset.highlight = keyword;
        parentElement.insertBefore(highlightedSpan, currentTextNode);
      }
    });

    parentElement.removeChild(currentTextNode);
  }
}

export function highlightKeywords(keywords, body, selectorAllOfKeywordParent) {
  const colors = getColors(keywords.length);

  const targetElements = [];
  for (const keyword of keywords) {
    targetElements.push(...selectorAllOfKeywordParent(body, keyword));
  }

  const uniqueElements = new Set(targetElements);

  for (const element of uniqueElements) {
    for (let i = 0; i < keywords.length; i++) {
      setHighlight(keywords[i], element, colors[i]);
    }
  }
}

export function highlightKeywordsWithColors(
  keywordColorPairs,
  body,
  selectorAllOfKeywordParent
) {
  const targetElements = [];
  for (const { keyword } of keywordColorPairs) {
    targetElements.push(...selectorAllOfKeywordParent(body, keyword));
  }

  const uniqueElements = new Set(targetElements);

  for (const { keyword, color } of keywordColorPairs) {
    for (const element of uniqueElements) {
      if (element.textContent.includes(keyword)) {
        setHighlight(keyword, element, color);
      }
    }
  }
}
