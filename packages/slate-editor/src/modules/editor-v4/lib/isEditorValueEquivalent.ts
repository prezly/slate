import type { Value } from '../types';

import { deserialize } from './deserialize';
import { serialize } from './serialize';

export function isEditorValueEquivalent(a: string | Value, b: string | Value): boolean {
    const aContent = typeof a === 'string' ? deserialize(a) : a;
    const bContent = typeof b === 'string' ? deserialize(b) : b;
    return serialize(aContent) === serialize(bContent);
}

