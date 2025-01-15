import type { ElementNode } from '@prezly/slate-types';
import { isElementNode } from '@prezly/slate-types';
import type { Node } from '@udecode/plate';

type Uuid = string;

export interface ButtonBlockNode extends ElementNode {
    type: typeof ButtonBlockNode.Type;
    uuid: Uuid;
    href: string;
    layout: `${ButtonBlockNode.Layout}`;
    variant: `${ButtonBlockNode.Variant}`;
    new_tab: boolean;
    label: string;
}

export namespace ButtonBlockNode {
    export const Type = 'button-block';

    export enum Layout {
        LEFT = 'left',
        RIGHT = 'right',
        CENTER = 'center',
        WIDE = 'wide',
    }

    export enum Variant {
        DEFAULT = 'default',
        OUTLINE = 'outline',
    }

    export function isButtonBlockNode(node: Node): node is ButtonBlockNode {
        return isElementNode(node, Type);
    }
}
