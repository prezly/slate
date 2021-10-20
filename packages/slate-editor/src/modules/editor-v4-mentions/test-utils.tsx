import { withInlineVoid } from '@prezly/slate-commons';
import { isPlaceholderNode, PLACEHOLDER_NODE_TYPE, PlaceholderNode } from '@prezly/slate-types';
import React from 'react';
import { Editor } from 'slate';
import { RenderElementProps } from 'slate-react';

import { MentionElement } from './components';
import MentionsExtension from './MentionsExtension';

const PlaceholderMentionsExtension = () =>
    MentionsExtension({
        id: 'MentionsExtension',
        normalizers: [],
        parseSerializedElement: JSON.parse,
        renderElement: ({ attributes, children, element }: RenderElementProps) => {
            if (isPlaceholderNode(element)) {
                return (
                    <MentionElement attributes={attributes} element={element}>
                        {`%${element.key}%`}
                        {children}
                    </MentionElement>
                );
            }

            return undefined;
        },
        type: PLACEHOLDER_NODE_TYPE,
    });

const getExtensions = () => [PlaceholderMentionsExtension()];

export const createPlaceholderMentionElement = (key: PlaceholderNode['key']): PlaceholderNode => ({
    children: [{ text: '' }],
    key,
    type: PLACEHOLDER_NODE_TYPE,
});

export const createMentionsEditor = (editor: Editor) => withInlineVoid(getExtensions)(editor);
