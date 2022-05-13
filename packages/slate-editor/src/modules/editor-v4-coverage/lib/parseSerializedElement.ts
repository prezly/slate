import type { CoverageNode } from '@prezly/slate-types';
import { validateCoverageNode } from '@prezly/slate-types';

import { createCoverage } from './createCoverage';

export function parseSerializedElement(serialized: string): CoverageNode | undefined {
    const parsed = validateCoverageNode(JSON.parse(serialized));

    if (parsed) {
        return createCoverage(parsed.coverage.id, parsed);
    }

    return undefined;
}
