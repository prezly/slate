const isElement = (node: Node): node is Element => node.nodeType === Node.ELEMENT_NODE;

export default isElement;
