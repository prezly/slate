import { useMemo } from 'react';

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

export function useVariables({ variables }: VariablesExtensionParameters = DEFAULT_PARAMETERS) {
    const options = useMemo(() => variables.map(placeholderToOption), [variables]);

    return useMentions<Variable>({
        createMentionElement: (option) => createVariableNode(option.value.key),
        options,
        trigger: '%',
    });
}
