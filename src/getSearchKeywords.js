function getSearchKeywords() {
  const currentUrl = new URL(window.location.href);
  const urlParams = new URLSearchParams(currentUrl.search);
  const allCondition = ["+", "AND", "|", "OR", "*", "-", ",", `"`, "(", ")"];
  const filterCondition = ["+", "AND", "|", "OR", "*", " ", ","];
  const exceptionCondition = [`"`, "(", ")"];
  let keywords;

  for (const key of urlParams.keys()) {
    if (key === "q" || key === "query") {
      keywords = urlParams.get(key);
    }
  }

  for (let i = 0; i < allCondition.length; i++) {
    if (keywords === allCondition[i]) {
      return keywords;
    }
  }

  exceptionCondition.forEach((condition) => {
    if (keywords.includes(condition)) {
      keywords = keywords.replaceAll(`"`, "");
      keywords = keywords.replaceAll("(", "");
      keywords = keywords.replaceAll(")", "");
    }
  });

  if (keywords.includes("-")) {
    const deleteIndex = keywords.indexOf("-");
    keywords = keywords.slice(0, deleteIndex - 1);
  }

  filterCondition.forEach((condition) => {
    if (keywords.includes(condition)) {
      keywords = keywords.split(condition);
    }
  });

  return keywords;
}

getSearchKeywords();

// window.onload
