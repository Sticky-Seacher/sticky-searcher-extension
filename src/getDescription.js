export function getDescription() {
  const descriptionMetaElement = document.querySelector(
    `meta[name="description"]`
  );
  const ogDescriptionMetaElement = document.querySelector(
    `meta[property="og:description"]`
  );

  let metaDescriptionText = descriptionMetaElement
    .getAttribute("content")
    .replaceAll(/png|jpg|jpeg|gif/gi, " ");
  let metaOgDescriptionText = ogDescriptionMetaElement
    .getAttribute("content")
    .replaceAll(/png|jpg|jpeg|gif/gi, " ");

  const metaFilterText = metaDescriptionText
    .split(/[|!?|~,'"|/./]/)
    .filter((text) => text !== "")
    .map((blank) => blank.trim());
  const metaOgFilterText = metaOgDescriptionText
    .split(/[|!?|~,'"|/./]/)
    .filter((text) => text !== "")
    .map((blank) => blank.trim());

  const finalFilterDescription = [];

  descriptionMetaElement && finalFilterDescription.push(metaFilterText);
  ogDescriptionMetaElement && finalFilterDescription.push(metaOgFilterText);

  if (!descriptionMetaElement && !ogDescriptionMetaElement) {
    throw Error("찾으시는 정보가 없습니다.");
  }
}
