import type { Extension } from '@prezly/slate-commons';
import { isMentionNode, MENTION_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { MentionElement, MentionsExtension } from '#extensions/mentions';

import { normalizeRedundantUserMentionAttributes, parseSerializedElement } from './lib';

export const EXTENSION_ID = 'UserMentionsExtension';

export const UserMentionsExtension = (): Extension =>
    MentionsExtension({
        id: EXTENSION_ID,
        type: MENTION_NODE_TYPE,
        normalizeNode: normalizeRedundantUserMentionAttributes,
        parseSerializedElement,
        renderElement: ({ attributes, children, element }: RenderElementProps) => {
            if (isMentionNode(element)) {
                return (
                    <MentionElement attributes={attributes} element={element}>
                        {element.user.name}
                        {children}
                    </MentionElement>
                );
            }

            return undefined;
        },
    });
