import { v4 as generateUuid } from 'uuid';

import { ButtonBlockNode } from '../ButtonBlockNode';

export function createButtonBlock(
    props: Partial<
        Pick<ButtonBlockNode, 'href' | 'new_tab' | 'layout' | 'variant' | 'uuid' | 'label'>
    >,
): ButtonBlockNode {
    const {
        href = '',
        new_tab = true,
        layout = ButtonBlockNode.Layout.CENTER,
        variant = ButtonBlockNode.Variant.DEFAULT,
        uuid = generateUuid(),
        label = 'Click me',
    } = props;

    return {
        href,
        layout,
        new_tab,
        label,
        type: ButtonBlockNode.Type,
        uuid,
        variant,
        children: [{ text: '' }],
    };
}
