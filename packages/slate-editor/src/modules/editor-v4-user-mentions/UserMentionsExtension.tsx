import { Extension } from '@prezly/slate-commons';
import React from 'react';
import { RenderElementProps } from 'slate-react';

import { MentionElement, MentionsExtension } from 'modules/editor-v4-mentions';

import { USER_MENTION_TYPE, USER_MENTIONS_EXTENSION_ID } from './constants';
import {
    isUserMentionElement,
    normalizeRedundantUserMentionAttributes,
    parseSerializedElement,
} from './lib';
import { UserMentionType } from './types';

const UserMentionsExtension = (): Extension =>
    MentionsExtension({
        id: USER_MENTIONS_EXTENSION_ID,
        normalizers: [normalizeRedundantUserMentionAttributes],
        parseSerializedElement,
        renderElement: ({ attributes, children, element }: RenderElementProps) => {
            if (isUserMentionElement(element)) {
                return (
                    <MentionElement<UserMentionType> attributes={attributes} element={element}>
                        {element.user.name}
                        {children}
                    </MentionElement>
                );
            }

            return undefined;
        },
        type: USER_MENTION_TYPE,
    });

export default UserMentionsExtension;
