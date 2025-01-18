export const SELECTOR = "div[data-sncf]";

export function getDescriptionElements(selector) {
  const checkedElements = [];

  document.querySelectorAll(selector).forEach((element) => {
    const elementsSharingTheSameParent = checkedElements.filter(
      (value) => value.parentElement === element.parentElement
    );

    if (
      element.textContent !== "" &&
      elementsSharingTheSameParent.length === 0
    ) {
      checkedElements.push(element);
    }
  });

  return checkedElements;
}

function refineDescription(draft) {
  let result = draft;

  if (draft.includes("—")) {
    result = draft.split("—").slice(1).join("");
  }

  const sentences = result
    .split(".")
    .map((blank) => blank.trim())
    .filter((text) => text !== "");
  return sentences[0];
}

export function setLinkMap(descriptionElements, keywords) {
  const linkMap = new Map();

  descriptionElements.forEach((element) => {
    const parent = element.parentElement;

    const linkZone = parent.firstElementChild;
    const link = linkZone.querySelector("a").href;

    const description = refineDescription(element.textContent);

    linkMap.set(link, {
      description,
      keywords,
    });
  });

  return linkMap;
}
