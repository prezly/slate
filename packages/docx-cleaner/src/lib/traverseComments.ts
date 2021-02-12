import isComment from './isComment';
import traverse from './traverse';

type Callback = (node: Comment) => boolean;

const traverseComments = (rootNode: Node, callback: Callback): void => {
    traverse(rootNode, (node) => {
        if (!isComment(node)) {
            return true;
        }

        return callback(node);
    });
};

export default traverseComments;
