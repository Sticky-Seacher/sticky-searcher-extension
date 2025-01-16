const READABLE_RGB_RANGE = 150;

export function makeRandomColor(rgbRangeEnd) {
  const r = Math.floor(Math.random() * rgbRangeEnd);
  const g = Math.floor(Math.random() * rgbRangeEnd);
  const b = Math.floor(Math.random() * rgbRangeEnd);
  return `rgb(${r}, ${g}, ${b})`;
}

function getColors(numberOfColorsNeeded) {
  const memory = [];

  return Array.from(Array(numberOfColorsNeeded), () => {
    let color = makeRandomColor(READABLE_RGB_RANGE);

    while (memory.includes(color)) {
      color = makeRandomColor(READABLE_RGB_RANGE);
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
    const text = currentTextNode.textContent;

    const excludedList = text.split(keyword);

    excludedList.forEach((stringFragment, index) => {
      const notKeywordText = document.createTextNode(stringFragment);
      parentElement.insertBefore(notKeywordText, currentTextNode);

      if (index !== excludedList.length - 1) {
        const highlightedSpan = document.createElement("span");
        highlightedSpan.textContent = keyword;
        highlightedSpan.style = `background:${color}`;
        parentElement.insertBefore(highlightedSpan, currentTextNode);
      }
    });

    parentElement.removeChild(currentTextNode);
  }
}

export function highlightKeywords(keywords, body, getLeafTargetElements) {
  const targetElements = [];
  const colors = getColors(keywords.length);

  for (const keyword of keywords) {
    targetElements.push(...getLeafTargetElements(body, keyword));
  }

  const uniqueElements = new Set(targetElements);

  for (const element of uniqueElements) {
    for (let i = 0; i < keywords.length; i += 1) {
      setHighlight(keywords[i], element, colors[i]);
    }
  }
}
