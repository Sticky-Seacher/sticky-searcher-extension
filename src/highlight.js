export function makeRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
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

// function setHighlight(keywords, targetElement, colors) {
//   const origin = targetElement.innerHTML;

//   let replace = origin;

//   for (let i = 0; i < keywords.length; i += 1) {
//     const keyword = keywords[i];
//     const color = colors[i];

//     replace = replace.replaceAll(
//       keyword,
//       `<span style="background:${color}">${keyword}</span>`
//     );
//   }

//   targetElement.innerHTML = replace;
// }

function setHighlight(keywords, targetElement, colors) {
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

    for (let i = 0; i < keywords.length; i += 1) {
      const keyword = keywords[i];
      const color = colors[i];

      const excludedArray = text.split(keyword);

      excludedArray.forEach((stringFragment, index) => {
        // text node화 해서 삽입
        const notKeywordText = document.createTextNode(stringFragment);
        parentElement.insertBefore(notKeywordText, currentTextNode);

        if (index !== excludedArray.length - 1) {
          // element화 해서 삽입
          const highlightedSpan = document.createElement("span");
          highlightedSpan.textContent = keyword;
          highlightedSpan.style = `background:${color}`;
          parentElement.insertBefore(highlightedSpan, currentTextNode);
        }
      });
    }
    parentElement.removeChild(currentTextNode); // 기존 text node 제거
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
    setHighlight(keywords, element, colors);
  }
}
