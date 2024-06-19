import { CalloutNode } from '@prezly/slate-types';

export function createCallout(
    props: Partial<Pick<CalloutNode, 'align' | 'children' | 'icon'>>,
): CalloutNode {
    const { align, children, icon = '💡' } = props;
    return {
        type: CalloutNode.TYPE,
        children: children ?? [{ text: '' }],
        align,
        icon,
    };
}
