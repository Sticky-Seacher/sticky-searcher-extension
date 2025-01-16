export function getSearchKeywords() {
  const currentUrl = new URL(window.location.href);
  const urlParams = new URLSearchParams(currentUrl.search);
  const allCondition = ["+", " AND ", "|", " OR ", " -", `"`, " ", ","];
  let keywords = null;

  for (const key of urlParams.keys()) {
    if (key === "q" || key === "query") {
      keywords = urlParams.get(key);
    }
  }

  if (keywords.includes(`"`)) {
    keywords = keywords.replaceAll(`"`, "");
    return [keywords];
  }

  for (let i = 0; i < allCondition.length; i++) {
    if (keywords === allCondition[i]) {
      return [keywords];
    }
  }

  for (let i = 0; i < allCondition.length; i++) {
    if (
      keywords[0] === allCondition[i] ||
      keywords[keywords.length - 1] === allCondition[i]
    ) {
      return [keywords];
    }
  }

  if (keywords.includes(" -")) {
    const deleteIndex = keywords.indexOf(" -");
    keywords = keywords.slice(0, deleteIndex);
  }

  allCondition.forEach((condition) => {
    if (keywords.includes(condition)) {
      keywords = keywords.split(condition);
    }
  });

  if (Array.isArray(keywords)) {
    keywords = keywords.filter((keyword) => keyword !== "");
    keywords = keywords.map((keyword) => keyword.trim());
    return keywords;
  } else {
    return [keywords];
  }
}
