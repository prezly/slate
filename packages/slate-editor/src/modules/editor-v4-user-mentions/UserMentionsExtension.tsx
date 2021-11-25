import type { Extension } from '@prezly/slate-commons';
import { isMentionNode, MENTION_NODE_TYPE } from '@prezly/slate-types';
import * as React from 'react';
import type { RenderElementProps } from 'slate-react';

import { MentionElement, MentionsExtension } from '../../modules/editor-v4-mentions';

import { USER_MENTIONS_EXTENSION_ID } from './constants';
import { normalizeRedundantUserMentionAttributes, parseSerializedElement } from './lib';

const UserMentionsExtension = (): Extension =>
    MentionsExtension({
        id: USER_MENTIONS_EXTENSION_ID,
        normalizers: [normalizeRedundantUserMentionAttributes],
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
        type: MENTION_NODE_TYPE,
    });

export default UserMentionsExtension;
