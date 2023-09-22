import { withExtensions } from '@prezly/slate-commons';
import type { VariableNode } from '@prezly/slate-types';
import { VARIABLE_NODE_TYPE } from '@prezly/slate-types';
import type { Editor } from 'slate';

// import { MentionsExtension } from './MentionsExtension';

const PlaceholderMentionsExtension = {
    id: 'MentionsExtension',
};
// MentionsExtension({
//     id: 'MentionsExtension',
//     parseSerializedElement: JSON.parse,
//     renderElement: ({ attributes, children, element }: RenderElementProps) => {
//         if (isVariableNode(element)) {
//             return (
//                 <MentionElement attributes={attributes} element={element}>
//                     {`%${element.key}%`}
//                     {children}
//                 </MentionElement>
//             );
//         }
//
//         return undefined;
//     },
//     type: VARIABLE_NODE_TYPE,
// });

export function createPlaceholderMentionElement(key: VariableNode['key']): VariableNode {
    return {
        children: [{ text: '' }],
        key,
        type: VARIABLE_NODE_TYPE,
    };
}

export function createMentionsEditor(editor: Editor) {
    // FIXME: Enable PlaceholderMentionsExtension extension for the test
    return withExtensions(editor, [PlaceholderMentionsExtension]);
}
