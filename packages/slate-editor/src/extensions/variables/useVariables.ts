import { isSubtitleHeadingNode, isTitleHeadingNode } from '@prezly/slate-types';
import { useCallback, useMemo } from 'react';
import type { BaseRange } from 'slate';
import { Editor } from 'slate';
import { useSlateStatic } from 'slate-react';

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

export function useVariables(variables: VariablesExtensionParameters['variables']) {
    const editor = useSlateStatic();
    const options = useMemo(() => variables.map(placeholderToOption), [variables]);
    const isEnabled = useCallback(
        (range: BaseRange | null) => {
            if (!range) {
                return true;
            }

            const nodes = Array.from(
                Editor.nodes(editor, {
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
        options,
        trigger: '%',
    });
}
