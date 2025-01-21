export function createRules(linkMaps, startID) {
  const rules = [];
  let currentIndex = startID;
  linkMaps.forEach((value, link) => {
    const { description } = value;

    const textFragment = encodeURIComponent(description);
    const redirectToUrl = link + "#:~:text=" + textFragment;

    const rule = {
      id: currentIndex,
      condition: {
        urlFilter: link,
        resourceTypes: ["main_frame", "xmlhttprequest"],
      },
      action: {
        type: "redirect",
        redirect: {
          url: redirectToUrl,
        },
      },
    };
    rules.push(rule);

    currentIndex += 1;
  });

  return rules;
}
