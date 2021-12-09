import { createEmptyValue } from './createEmptyValue';
import { serialize } from './serialize';

export function createEmptyEditorValueAsString(): string {
    return serialize(createEmptyValue());
}
