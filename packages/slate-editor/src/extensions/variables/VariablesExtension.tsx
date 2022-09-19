import type { Extension } from '@prezly/slate-commons';
import { isVariableNode, VARIABLE_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { MentionElement, MentionsExtension } from '#extensions/mentions';

import { removeUnknownVariableNodeAttributes, parseSerializedElement } from './lib';

export const EXTENSION_ID = 'VariablesExtension';

export const VariablesExtension = (): Extension =>
    MentionsExtension({
        id: EXTENSION_ID,
        type: VARIABLE_NODE_TYPE,
        normalizeNode: removeUnknownVariableNodeAttributes,
        parseSerializedElement,
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
    });
