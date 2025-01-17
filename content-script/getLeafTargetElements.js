function getLeafTargetElements(rootElement, targetString) {
  if (!(rootElement instanceof Element)) {
    throw TypeError("rootElement에는 Element를 제공해주세요.");
  }
  if (typeof targetString !== "string") {
    throw TypeError("targetString에는 string을 제공해주세요.");
  }

  const targetElements = [];

  const textNodeIterator = document.createNodeIterator(
    rootElement,
    NodeFilter.SHOW_TEXT,
    (node) => {
      const isWanted =
        node.textContent.includes(targetString) &&
        node.nodeName.toLowerCase() !== "script";

      return isWanted ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  );

  for (
    let currentNode = textNodeIterator.nextNode();
    currentNode;
    currentNode = textNodeIterator.nextNode()
  ) {
    const targetElement = currentNode.parentElement;
    if (targetElement.nodeName.toLowerCase() !== "script") {
      targetElements.push(targetElement);
    }
  }

  return targetElements;
}

export default getLeafTargetElements;
