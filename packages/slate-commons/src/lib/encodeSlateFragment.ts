import { Node } from 'slate';

const encodeSlateFragment = (fragment: Node[]): string => {
    return window.btoa(encodeURIComponent(JSON.stringify(fragment)));
};

export default encodeSlateFragment;
