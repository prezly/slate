import type { Coverage } from '@prezly/sdk';

import { createCoverage } from '#modules/editor-v4-coverage';

import { createEmptyValue } from './createEmptyValue';
import { serialize } from './serialize';

export function createEditorValueWithCoverageAsString(coverageIds: Coverage['id'][]): string {
    const emptyValue = createEmptyValue();
    const coverageNodes = coverageIds.map((id) => createCoverage(id));
    const value = [...emptyValue, ...coverageNodes];
    return serialize(value);
}
