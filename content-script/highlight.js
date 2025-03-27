const BACKGROUND_COLORS = [
  "#8fbb4d",
  "#687668",
  "#63c5a3",
  "#deb671",
  "#DDDDDD",
  "#dca29e",
  "#6ea1ca",
  "#b9a9da",
];

export function makeRandomBackgroundColor() {
  return BACKGROUND_COLORS[
    Math.floor(Math.random() * BACKGROUND_COLORS.length)
  ];
}

export function getColors(numberOfColorsNeeded) {
  const memory = [];
  return Array.from(Array(numberOfColorsNeeded), (_, index) => {
    let color = BACKGROUND_COLORS[index % BACKGROUND_COLORS.length];
    while (memory.includes(color)) {
      color = BACKGROUND_COLORS[index % BACKGROUND_COLORS.length];
    }
    memory.push(color);
    return color;
  });
}

function setHighlight(keyword, targetElement, color) {
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

    const excludedList = text.split(keyword);

    excludedList.forEach((stringFragment, index) => {
      const notKeywordText = document.createTextNode(stringFragment);
      parentElement.insertBefore(notKeywordText, currentTextNode);

      if (index !== excludedList.length - 1) {
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
  const targetElements = [];
  const colors = getColors(keywords.length, makeRandomBackgroundColor);

  for (const keyword of keywords) {
    targetElements.push(...selectorAllOfKeywordParent(body, keyword));
  }

  const uniqueElements = new Set(targetElements);

  for (const element of uniqueElements) {
    for (let i = 0; i < keywords.length; i += 1) {
      setHighlight(keywords[i], element, colors[i]);
    }
  }
}
