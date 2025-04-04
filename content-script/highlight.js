const BACKGROUND_COLORS = [
  "#CFF09E",
  "#D7FFF1",
  "#aaaaaa",
  "#FADAD8",
  "#dac8ff",
];

export function makeRandomBackgroundColor() {
  return BACKGROUND_COLORS[
    Math.floor(Math.random() * BACKGROUND_COLORS.length)
  ];
}

export function getColors(numberOfColorsNeeded, creatColor) {
  const memory = [];

  return Array.from(Array(numberOfColorsNeeded), () => {
    let color = creatColor();

    while (memory.includes(color)) {
      color = creatColor();
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
