import type { ElementNode } from '@prezly/slate-types';
import { isElementNode } from '@prezly/slate-types';
import type { Node } from 'slate';

type Uuid = string;

export interface ButtonBlockNode extends ElementNode {
    type: typeof ButtonBlockNode.Type;
    uuid: Uuid;
    href: string;
    layout: ButtonBlockNode.ButtonLayout;
    variant: ButtonBlockNode.ButtonVariant;
    new_tab: boolean;
    label: string;
}

enum Layout {
    LEFT = 'left',
    RIGHT = 'right',
    CENTER = 'center',
    WIDE = 'wide',
}

enum Variant {
    DEFAULT = 'default',
    OUTLINE = 'outline',
}

export namespace ButtonBlockNode {
    export const Type = 'button-block';

    export type ButtonLayout = `${Layout}`;

    export type ButtonVariant = `${Variant}`;

    export function isButtonBlockNode(node: Node): node is ButtonBlockNode {
        return isElementNode(node, Type);
    }
}
