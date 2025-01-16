import type { Extension } from '@prezly/slate-commons';
import { isVariableNode, VARIABLE_NODE_TYPE } from '@prezly/slate-types';
import { type RenderElementProps } from '@udecode/plate';
import React from 'react';

import { MentionsExtension } from '#extensions/mentions';

import { parseSerializedElement } from './lib';
import {
    convertLegacyPlaceholderNodesToVariables,
    removeFallbackPropertyIfEmpty,
    removeUnknownVariableNodeAttributes,
    removeUnknownVariables,
} from './normalization';
import type { VariablesExtensionParameters } from './types';
import { VariableElement } from './VariableElement';

export const EXTENSION_ID = 'VariablesExtension';

export function VariablesExtension({ variables }: VariablesExtensionParameters): Extension {
    const variablesNames = variables.map(({ key }) => key);
    return MentionsExtension({
        id: EXTENSION_ID,
        type: VARIABLE_NODE_TYPE,
        normalizeNode: [
            convertLegacyPlaceholderNodesToVariables,
            removeUnknownVariables(variablesNames),
            removeUnknownVariableNodeAttributes,
            removeFallbackPropertyIfEmpty,
        ],
        parseSerializedElement,
        renderElement: ({ attributes, children, element }: RenderElementProps) => {
            if (isVariableNode(element)) {
                return (
                    <VariableElement
                        attributes={attributes}
                        element={element}
                        variables={variables}
                    >
                        {children}
                    </VariableElement>
                );
            }

            return undefined;
        },
    });
}
