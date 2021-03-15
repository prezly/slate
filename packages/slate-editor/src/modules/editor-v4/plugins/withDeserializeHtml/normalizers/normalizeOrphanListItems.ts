import { ElementType } from 'modules/editor-v4-rich-formatting';

const isListItem = (element: Element): boolean => {
    if (element.nodeName === 'LI') {
        return true;
    }

    return element instanceof HTMLElement && element.dataset.slateType === ElementType.LIST_ITEM;
};

const normalizeOrphanListItems = (document: Document): Document => {
    const { body } = document;

    for (const child of body.children) {
        // <li> (or "list-item") cannot be at the root of the document, it needs a parent <ul> or <ol>
        // so we're going to wrap those in <ul>
        if (isListItem(child)) {
            const list = document.createElement('ul');
            body.replaceChild(list, child);
            list.appendChild(child);
        }
    }

    return document;
};

export default normalizeOrphanListItems;
