import type { VariableKey } from '@prezly/slate-types';

export interface Variable {
    key: VariableKey;
    text: string;
}

export interface VariablesExtensionParameters {
    variables: Variable[];
}
