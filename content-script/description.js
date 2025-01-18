export const SELECTOR = "div[data-sncf]";

export function getDescriptionListForOnePage(selector) {
  const descriptionList = [];
  const checkedElements = [];

  document.querySelectorAll(selector).forEach((element) => {
    const elementsSharingTheSameParent = checkedElements.filter(
      (value) => value.parentElement === element.parentElement
    );

    if (
      element.textContent !== "" &&
      elementsSharingTheSameParent.length === 0
    ) {
      descriptionList.push(element.textContent);
      checkedElements.push(element);
    }
  });

  const refinedList = descriptionList.map((draft) => {
    let result = draft;

    if (draft.includes("—")) {
      result = draft.split("—").slice(1).join("");
    }

    const sentences = result
      .split(".")
      .map((blank) => blank.trim())
      .filter((text) => text !== "");
    return sentences[0];
  });

  return refinedList;
}
