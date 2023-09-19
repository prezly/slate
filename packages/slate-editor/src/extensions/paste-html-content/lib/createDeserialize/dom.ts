export type HTMLNode = globalThis.Node;
export type HTMLText = globalThis.Text;
export type HTMLElement = globalThis.HTMLElement;

export function isHTMLText(node: HTMLNode): node is HTMLText {
    return node.nodeType === Node.TEXT_NODE;
}

export function isHTMLElement(node: HTMLNode): node is HTMLElement {
    return node.nodeType === Node.ELEMENT_NODE && node instanceof HTMLElement;
}
