const temporarilyReplaceNode = (node: Node, replacement: Node): { restore: () => void } => {
    if (node.parentNode) {
        node.parentNode.replaceChild(replacement, node);
    }

    return {
        restore() {
            if (replacement.parentNode) {
                replacement.parentNode.replaceChild(node, replacement);
            }
        },
    };
};

export default temporarilyReplaceNode;
