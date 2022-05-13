import type { CoverageNode } from '@prezly/slate-types';
import { COVERAGE_NODE_TYPE, CoverageLayout } from '@prezly/slate-types';
import { v4 as uuidV4 } from 'uuid';

export function createCoverage(
    id: CoverageNode['coverage']['id'],
    props: Partial<Omit<CoverageNode, 'type' | 'children' | 'coverage'>> = {},
): CoverageNode {
    return {
        uuid: uuidV4(),
        layout: CoverageLayout.HORIZONTAL,
        new_tab: true,
        show_thumbnail: true,
        ...props,
        coverage: { id },
        type: COVERAGE_NODE_TYPE,
        children: [{ text: '' }],
    };
}
