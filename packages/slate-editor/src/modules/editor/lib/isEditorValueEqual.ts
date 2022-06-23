import type { Value } from '../types';

import { serialize } from './serialize';

export function isEditorValueEqual(a: Value, b: Value): boolean {
    return a === b || serialize(a) === serialize(b);
}
