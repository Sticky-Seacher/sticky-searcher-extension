export function getDescription() {
  const descriptionMetaElement = document.querySelector(
    `meta[name="description"]`
  );
  const ogDescriptionMetaElement = document.querySelector(
    `meta[property="og:description"]`
  );

  let metaDescriptionText;
  let metaFilterText;
  let metaOgDescriptionText;
  let metaOgFilterText;

  if (descriptionMetaElement) {
    metaDescriptionText = descriptionMetaElement
      .getAttribute("content")
      .replaceAll(/png|jpg|jpeg|gif/gi, " ");

    metaFilterText = metaDescriptionText
      .split(/[|!?|~,'"|/./]/)
      .filter((text) => text !== "")
      .map((blank) => blank.trim());
  }

  if (ogDescriptionMetaElement) {
    metaOgDescriptionText = ogDescriptionMetaElement
      .getAttribute("content")
      .replaceAll(/png|jpg|jpeg|gif/gi, " ");

    metaOgFilterText = metaOgDescriptionText
      .split(/[|!?|~,'"|/./]/)
      .filter((text) => text !== "")
      .map((blank) => blank.trim());
  }

  const finalFilterDescription = [];

  descriptionMetaElement && finalFilterDescription.push(metaFilterText);
  ogDescriptionMetaElement && finalFilterDescription.push(metaOgFilterText);

  if (!descriptionMetaElement && !ogDescriptionMetaElement) {
    throw Error("찾으시는 정보가 없습니다.");
  }

  return finalFilterDescription;
}
