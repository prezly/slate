import getListTypeNode from './getListTypeNode';
import isOrderedListSymbol from './isOrderedListSymbol';

const isOrderedList = (element: Element): boolean => {
    const listTypeNode = getListTypeNode(element);

    if (!listTypeNode) {
        return false;
    }

    return isOrderedListSymbol(listTypeNode.textContent || '');
};

export default isOrderedList;
