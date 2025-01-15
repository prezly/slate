import { withInlineVoid } from '@prezly/slate-commons';
import type { VariableNode } from '@prezly/slate-types';
import { isVariableNode, VARIABLE_NODE_TYPE } from '@prezly/slate-types';
import type { RenderElementProps, SlateEditor } from '@udecode/plate';
import React from 'react';

import { MentionElement } from './components';
import { MentionsExtension } from './MentionsExtension';

const PlaceholderMentionsExtension = () =>
    MentionsExtension({
        id: 'MentionsExtension',
        parseSerializedElement: JSON.parse,
        renderElement: ({ attributes, children, element }: RenderElementProps) => {
            if (isVariableNode(element)) {
                return (
                    <MentionElement attributes={attributes} element={element}>
                        {`%${element.key}%`}
                        {children}
                    </MentionElement>
                );
            }

            return undefined;
        },
        type: VARIABLE_NODE_TYPE,
    });

const getExtensions = () => [PlaceholderMentionsExtension()];

export function createPlaceholderMentionElement(key: VariableNode['key']): VariableNode {
    return {
        children: [{ text: '' }],
        key,
        type: VARIABLE_NODE_TYPE,
    };
}

export function createMentionsEditor(editor: SlateEditor) {
    return withInlineVoid(getExtensions)(editor);
}
