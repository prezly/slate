import { useRegisterExtension } from '@prezly/slate-commons';
import { isVariableNode, VARIABLE_NODE_TYPE } from '@prezly/slate-types';
import React, { useMemo } from 'react';
import type { RenderElementProps } from 'slate-react';

import { MentionElement, MentionsExtension } from '#extensions/mentions';

import { VariablesDropdown } from './components';
import { parseSerializedElement } from './lib';
import {
    convertLegacyPlaceholderNodesToVariables,
    removeUnknownVariableNodeAttributes,
    removeUnknownVariables,
} from './normalization';
import type { VariablesExtensionParameters } from './types';
import { useVariables } from './useVariables';

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

    const { index, target, options, onAdd, onKeyDown } = useVariables(variables);

    // TODO: Find a better way maybe?
    useRegisterExtension({ id: `${EXTENSION_ID}:onKeyDown`, onKeyDown });

    return (
        <>
            <MentionsExtension
                id={EXTENSION_ID}
                type={VARIABLE_NODE_TYPE}
                normalizeNode={normalizeNode}
                parseSerializedElement={parseSerializedElement}
                renderElement={renderElement}
            />

            <VariablesDropdown
                index={index}
                onOptionClick={onAdd}
                options={options}
                target={target}
            />
        </>
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
