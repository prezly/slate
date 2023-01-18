import type { CoverageEntry } from '@prezly/sdk';

export interface CoverageExtensionConfiguration {
    /**
     * Moment.js-compatible format
     */
    dateFormat: string;
    fetchCoverage: (id: CoverageEntry['id']) => Promise<CoverageEntry>;
}
