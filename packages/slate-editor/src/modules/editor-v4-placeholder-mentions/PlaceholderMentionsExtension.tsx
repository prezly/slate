import { Extension } from '@prezly/slate-commons';
import { isPlaceholderNode, PLACEHOLDER_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';
import { RenderElementProps } from 'slate-react';

import { MentionElement, MentionsExtension } from '../../modules/editor-v4-mentions';

import { PLACEHOLDER_MENTIONS_EXTENSION_ID } from './constants';
import { normalizeRedundantPlaceholderMentionAttributes, parseSerializedElement } from './lib';

const PlaceholderMentionsExtension = (): Extension =>
    MentionsExtension({
        id: PLACEHOLDER_MENTIONS_EXTENSION_ID,
        normalizers: [normalizeRedundantPlaceholderMentionAttributes],
        parseSerializedElement,
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

export default PlaceholderMentionsExtension;
