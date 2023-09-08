import { useRegisterExtension } from '@prezly/slate-commons';
import { isMentionNode, MENTION_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { MentionElement, MentionsExtension } from '#extensions/mentions';

import { UserMentionsDropdown } from './components';
import { normalizeRedundantUserMentionAttributes, parseSerializedElement } from './lib';
import type { UserMentionsExtensionParameters } from './types';
import { useUserMentions } from './useUserMentions';

export const EXTENSION_ID = 'UserMentionsExtension';

export function UserMentionsExtension({ users }: UserMentionsExtensionParameters) {
    const { index, target, options, onAdd, onKeyDown } = useUserMentions(users);

    // TODO: Find a better way maybe?
    useRegisterExtension({ id: `${EXTENSION_ID}:onKeyDown`, onKeyDown });

    return (
        <>
            <MentionsExtension
                id={EXTENSION_ID}
                type={MENTION_NODE_TYPE}
                normalizeNode={normalizeRedundantUserMentionAttributes}
                parseSerializedElement={parseSerializedElement}
                renderElement={renderElement}
            />

            <UserMentionsDropdown
                index={index}
                onOptionClick={onAdd}
                options={options}
                target={target}
            />
        </>
    );
}

function renderElement({ attributes, children, element }: RenderElementProps) {
    if (isMentionNode(element)) {
        return (
            <MentionElement attributes={attributes} element={element}>
                {element.user.name}
                {children}
            </MentionElement>
        );
    }

    return undefined;
}
