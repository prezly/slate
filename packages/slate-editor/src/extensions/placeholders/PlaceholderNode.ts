import type { ElementNode } from '@prezly/slate-types';
import { isElementNode } from '@prezly/slate-types';
import type { Node } from 'slate';

type Uuid = string;

export interface PlaceholderNode<T extends PlaceholderNode.Type = PlaceholderNode.Type>
    extends ElementNode {
    type: T;
    uuid: Uuid;
}

export namespace PlaceholderNode {
    export enum Type {
        ATTACHMENT = 'placeholder:attachment',
        EMBED = 'placeholder:embed',
        IMAGE = 'placeholder:image',
        GALLERY = 'placeholder:gallery',
    }

    export function isPlaceholderNode<T extends Type>(
        node: Node,
        type: `${T}`,
    ): node is PlaceholderNode<T>;
    export function isPlaceholderNode(node: Node): node is PlaceholderNode;
    export function isPlaceholderNode(node: Node, type?: string): boolean {
        if (type) {
            return isElementNode(node, type);
        }
        return isElementNode(node, [Type.ATTACHMENT, Type.EMBED, Type.IMAGE, Type.GALLERY]);
    }
}
