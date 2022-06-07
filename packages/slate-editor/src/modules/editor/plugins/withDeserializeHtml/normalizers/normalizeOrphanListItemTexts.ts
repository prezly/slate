import { LIST_ITEM_TEXT_NODE_TYPE } from '@prezly/slate-types';

function isListItemText(element: Element): boolean {
    return element instanceof HTMLElement && element.dataset.slateType === LIST_ITEM_TEXT_NODE_TYPE;
}

export function normalizeOrphanListItemTexts(document: Document): Document {
    const { body } = document;

    for (const child of body.children) {
        // "list-item-text" cannot be at the root of the document, it needs a parent <ul> or <ol>
        // so we're going to wrap those in <li> and then in <ul>
        if (isListItemText(child)) {
            const childClone = child.cloneNode(true);
            const list = document.createElement('ul');
            const listItem = document.createElement('li');
            body.replaceChild(list, child);
            list.appendChild(listItem);
            listItem.appendChild(childClone);
        }
    }

    return document;
}
