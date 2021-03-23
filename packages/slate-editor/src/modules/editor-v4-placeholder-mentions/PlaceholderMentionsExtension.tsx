import { Extension } from '@prezly/slate-commons';
import React from 'react';
import { RenderElementProps } from 'slate-react';

import { MentionElement, MentionsExtension } from '../../modules/editor-v4-mentions';

import { PLACEHOLDER_MENTION_TYPE, PLACEHOLDER_MENTIONS_EXTENSION_ID } from './constants';
import {
    isPlaceholderMentionElement,
    normalizeRedundantPlaceholderMentionAttributes,
    parseSerializedElement,
} from './lib';
import { PlaceholderMentionType } from './types';

const PlaceholderMentionsExtension = (): Extension =>
    MentionsExtension({
        id: PLACEHOLDER_MENTIONS_EXTENSION_ID,
        normalizers: [normalizeRedundantPlaceholderMentionAttributes],
        parseSerializedElement,
        renderElement: ({ attributes, children, element }: RenderElementProps) => {
            if (isPlaceholderMentionElement(element)) {
                return (
                    <MentionElement<PlaceholderMentionType>
                        attributes={attributes}
                        element={element}
                    >
                        {`%${element.key}%`}
                        {children}
                    </MentionElement>
                );
            }

            return undefined;
        },
        type: PLACEHOLDER_MENTION_TYPE,
    });

export default PlaceholderMentionsExtension;
