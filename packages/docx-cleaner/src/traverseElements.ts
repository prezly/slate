import isElement from './isElement';
import traverse from './traverse';

type Callback = (node: Element) => boolean;

const traverseElements = (rootNode: Node, callback: Callback): void => {
    traverse(rootNode, (node) => {
        if (!isElement(node)) {
            return true;
        }

        return callback(node);
    });
};

export default traverseElements;
