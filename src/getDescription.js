export function getDescription() {
  const metaDescription = document.querySelector(`meta[name="description"]`);
  const metaOgDescription = document.querySelector(
    `meta[property="og:description"]`
  );

  let metaDescriptionText = metaDescription
    .getAttribute("content")
    .replaceAll(/png|jpg|jpeg|gif/gi, " ");
  let metaOgDescriptionText = metaOgDescription
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

  metaDescription && finalFilterDescription.push(metaFilterText);
  metaOgDescription && finalFilterDescription.push(metaOgFilterText);

  if (metaDescription && metaOgDescription === false) {
    throw Error("찾으시는 정보가 없습니다.");
  }
}
