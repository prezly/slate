import type { Node } from 'slate';

export function encodeSlateFragment(fragment: Node[]): string {
    return window.btoa(encodeURIComponent(JSON.stringify(fragment)));
}
