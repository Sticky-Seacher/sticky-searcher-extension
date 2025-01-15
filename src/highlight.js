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

function setHighlight(keywords, targetElement, colors) {
  const origin = targetElement.innerHTML;

  let replace = origin;

  for (let i = 0; i < keywords.length; i += 1) {
    const keyword = keywords[i];
    const color = colors[i];

    replace = replace.replace(
      keyword,
      `<span style="background:${color}">${keyword}</span>`
    );
  }

  targetElement.innerHTML = replace;
}

export function highlightKeywords(keywords, body, getLeafTargetElements) {
  const targetElements = [];
  const colors = getColors(keywords.length);

  for (const keyword of keywords) {
    targetElements.push(...getLeafTargetElements(body, keyword));
  }

  for (const targetElement of targetElements) {
    setHighlight(keywords, targetElement, colors);
  }
}
