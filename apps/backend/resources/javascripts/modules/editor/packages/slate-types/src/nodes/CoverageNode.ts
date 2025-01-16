import type { CoverageEntry } from '@prezly/sdk';

import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';
import { isBoolean, isEnum, isNonZeroInteger, isObject, isUuid } from './validation';

export const COVERAGE_NODE_TYPE = 'coverage';

export enum CoverageLayout {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
}

export interface CoverageNode extends ElementNode {
    type: typeof COVERAGE_NODE_TYPE;
    uuid: string;
    coverage: {
        id: CoverageEntry['id'];
    };
    layout: CoverageLayout;
    new_tab: boolean;
    show_thumbnail: boolean;
}

export function isCoverageNode(value: any): value is CoverageNode {
    return isElementNode<CoverageNode>(value, COVERAGE_NODE_TYPE);
}

export function validateCoverageNode(value: any): CoverageNode | null {
    const isValid =
        isCoverageNode(value) &&
        isUuid(value.uuid) &&
        isEnum(value.layout, CoverageLayout) &&
        isBoolean(value.new_tab) &&
        isBoolean(value.show_thumbnail) &&
        isObject(value.coverage) &&
        (isNonZeroInteger(value.coverage.id) || isUuid(value.coverage.id));

    return isValid ? value : null;
}
