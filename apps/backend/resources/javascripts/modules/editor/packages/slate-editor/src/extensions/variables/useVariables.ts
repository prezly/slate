import { isSubtitleHeadingNode, isTitleHeadingNode } from '@prezly/slate-types';
import type { Range, SlateEditor } from '@udecode/plate';
import { useCallback, useMemo } from 'react';

import type { Option } from '#extensions/mentions';
import { useMentions } from '#extensions/mentions';

import { createVariableNode } from './lib';
import type { Variable, VariablesExtensionParameters } from './types';

function placeholderToOption(placeholder: Variable): Option<Variable> {
    return {
        id: placeholder.key,
        label: placeholder.text,
        value: placeholder,
    };
}

const DEFAULT_PARAMETERS: VariablesExtensionParameters = { variables: [] };

export function useVariables(
    editor: SlateEditor,
    { variables }: VariablesExtensionParameters = DEFAULT_PARAMETERS,
) {
    const options = useMemo(() => variables.map(placeholderToOption), [variables]);
    const isEnabled = useCallback(
        (range: Range | null) => {
            if (!range) {
                return true;
            }

            const nodes = Array.from(
                editor.api.nodes({
                    at: range,
                    match: (node) => isTitleHeadingNode(node) || isSubtitleHeadingNode(node),
                }),
            );
            return nodes.length === 0;
        },
        [editor],
    );

    return useMentions<Variable>({
        createMentionElement: (option) => createVariableNode(option.value.key),
        isEnabled,
        moveCursorAfterInsert: false,
        options,
        trigger: '%',
    });
}
