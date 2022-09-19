import type { Extension } from '@prezly/slate-commons';
import { isVariableNode, VARIABLE_NODE_TYPE } from '@prezly/slate-types';
import React from 'react';
import type { RenderElementProps } from 'slate-react';

import { MentionElement, MentionsExtension } from '#extensions/mentions';

import {
    convertLegacyPlaceholderNodesToVariables,
    parseSerializedElement,
    removeUnknownVariableNodeAttributes,
    removeUnknownVariables,
} from './lib';
import type { VariablesExtensionParameters } from './types';

export const EXTENSION_ID = 'VariablesExtension';

export const VariablesExtension = ({ variables }: VariablesExtensionParameters): Extension =>
    MentionsExtension({
        id: EXTENSION_ID,
        type: VARIABLE_NODE_TYPE,
        normalizeNode: [
            convertLegacyPlaceholderNodesToVariables,
            removeUnknownVariableNodeAttributes,
            removeUnknownVariables(variables),
        ],
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
