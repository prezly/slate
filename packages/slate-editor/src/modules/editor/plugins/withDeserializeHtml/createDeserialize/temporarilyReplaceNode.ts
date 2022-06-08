export function temporarilyReplaceNode(node: Node, replacement: Node): { restore: () => void } {
    if (node.parentNode) {
        node.parentNode.replaceChild(replacement, node);
    }

    return {
        restore() {
            replacement.parentNode?.replaceChild(node, replacement);
        },
    };
}
