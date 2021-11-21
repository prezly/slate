import type { Node } from 'slate';

const decodeSlateFragment = (fragment: string): Node[] => {
    const decoded = JSON.parse(decodeURIComponent(window.atob(fragment)));
    const nodes = Array.isArray(decoded) ? decoded : [decoded];
    return nodes;
};

export default decodeSlateFragment;
