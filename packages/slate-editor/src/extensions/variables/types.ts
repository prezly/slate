export interface Variable {
    key: string;
    text: string;
    withFallback?: boolean;
}

export interface VariablesExtensionParameters {
    variables: Variable[];
}
