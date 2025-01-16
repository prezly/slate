import { type Node } from '@udecode/plate';

export function encodeSlateFragment(fragment: Node[]): string {
    return window.btoa(encodeURIComponent(JSON.stringify(fragment)));
}
