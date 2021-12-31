import type { Node } from 'slate';

function encodeSlateFragment(fragment: Node[]): string {
    return window.btoa(encodeURIComponent(JSON.stringify(fragment)));
}

export default encodeSlateFragment;
