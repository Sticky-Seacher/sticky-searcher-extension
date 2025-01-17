export function makeRandomColor() {
  let r = 0;
  let b = 0;
  let g = 0;
  let isReadable = false;

  while (!isReadable) {
    r = Math.floor(Math.random() * 256);
    g = Math.floor(Math.random() * 256);
    b = Math.floor(Math.random() * 256);

    isReadable = 0.2126 * r + 0.7152 * g + 0.0722 * b >= 0.583788;
  }

  return `rgb(${r}, ${g}, ${b})`;
}

function getColors(numberOfColorsNeeded) {
  const memory = [];

  return Array.from(Array(numberOfColorsNeeded), () => {
    let color = makeRandomColor();

    while (memory.includes(color)) {
      color = makeRandomColor();
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
        parentElement.insertBefore(highlightedSpan, currentTextNode);
      }
    });

    parentElement.removeChild(currentTextNode);
  }
}

export function highlightKeywords(keywords, body, selectorAllOfKeywordParent) {
  const targetElements = [];
  const colors = getColors(keywords.length);

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
