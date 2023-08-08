import type { ElementNode } from '@prezly/slate-types';
import { isElementNode } from '@prezly/slate-types';
import type { Node } from 'slate';

type Uuid = string;

export interface ButtonBlockNode extends ElementNode {
    type: typeof ButtonBlockNode.Type;
    uuid: Uuid;
    href: string;
    layout: ButtonBlockNode.Layout;
    variant: ButtonBlockNode.Variant;
    new_tab: boolean;
    text: string;
}

export namespace ButtonBlockNode {
    export const Type = 'button-block';

    export enum Layout {
        LEFT = 'left',
        RIGHT = 'right',
        CENTER = 'center',
        FULL_WIDTH = 'full-width',
    }

    export enum Variant {
        DEFAULT = 'default',
        OUTLINE = 'outline',
    }

    export function isButtonBlockNode(node: Node): node is ButtonBlockNode {
        return isElementNode(node, Type);
    }
}
