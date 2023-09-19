import { isVariableNode, VARIABLE_NODE_TYPE } from '@prezly/slate-types';
import React, { useMemo } from 'react';
import type { RenderElementProps } from 'slate-react';

import { MentionElement, MentionsExtension } from '#extensions/mentions';

import { parseSerializedElement } from './lib';
import {
    convertLegacyPlaceholderNodesToVariables,
    removeUnknownVariableNodeAttributes,
    removeUnknownVariables,
} from './normalization';
import type { VariablesExtensionParameters } from './types';

export const EXTENSION_ID = 'VariablesExtension';

export function VariablesExtension({ variables }: VariablesExtensionParameters) {
    const variablesNames = variables.map(({ key }) => key);
    const normalizeNode = useMemo(
        () => [
            convertLegacyPlaceholderNodesToVariables,
            removeUnknownVariables(variablesNames),
            removeUnknownVariableNodeAttributes,
        ],
        [JSON.stringify(variablesNames)],
    );

    return (
        <MentionsExtension
            id={EXTENSION_ID}
            type={VARIABLE_NODE_TYPE}
            normalizeNode={normalizeNode}
            parseSerializedElement={parseSerializedElement}
            renderElement={renderElement}
        />
    );
}

function renderElement({ attributes, children, element }: RenderElementProps) {
    if (isVariableNode(element)) {
        return (
            <MentionElement attributes={attributes} element={element}>
                {`%${element.key}%`}
                {children}
            </MentionElement>
        );
    }

    return undefined;
}
