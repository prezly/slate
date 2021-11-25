import { withInlineVoid } from '@prezly/slate-commons';
import type { PlaceholderNode } from '@prezly/slate-types';
import { isPlaceholderNode, PLACEHOLDER_NODE_TYPE } from '@prezly/slate-types';
import * as React from 'react';
import type { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';

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
