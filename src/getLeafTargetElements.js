function getLeafTargetElements(rootElement, targetString) {
  const result = [];

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
      result.push(targetElement);
    }
  }

  return result;
}

export default getLeafTargetElements;
