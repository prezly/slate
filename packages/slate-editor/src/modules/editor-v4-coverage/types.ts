import { Coverage } from '@prezly/sdk';
import { ReactNode, RefObject } from 'react';
import { Element } from 'slate';

import { COVERAGE_TYPE } from './constants';

export type CoverageType = typeof COVERAGE_TYPE;

export interface CoverageElementType extends Element {
    coverage: {
        id: Coverage['id'];
    };
    type: CoverageType;
    uuid: string;
}

export interface CoverageExtensionParameters {
    /**
     * Moment.js-compatible format
     */
    dateFormat: string;
    fetchCoverage: (id: Coverage['id']) => Promise<Coverage>;
    renderSearch: (searchProps: SearchProps) => ReactNode;
}

export interface CoverageParameters extends CoverageExtensionParameters {
    containerRef: RefObject<HTMLElement>;
}

export interface SearchProps {
    onChange: (query: string) => void;
    onSubmit: (coverage: Coverage) => void;
}
