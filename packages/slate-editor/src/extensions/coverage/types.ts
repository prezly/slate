import type { CoverageEntry } from '@prezly/sdk';
import type { ReactNode } from 'react';

export interface CoverageExtensionConfiguration {
    /**
     * Moment.js-compatible format
     */
    dateFormat: string;
    fetchCoverage: (id: CoverageEntry['id']) => Promise<CoverageEntry>;
    renderSearch: (searchProps: SearchProps) => ReactNode;
}

export interface SearchProps {
    onChange: (query: string) => void;
    onSubmit: (coverage: CoverageEntry) => void;
}
