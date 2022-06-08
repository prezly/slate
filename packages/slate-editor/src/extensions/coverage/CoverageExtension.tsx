import type { Extension } from '@prezly/slate-commons';
import { createDeserializeElement } from '@prezly/slate-commons';
import { COVERAGE_NODE_TYPE, isCoverageNode } from '@prezly/slate-types';
import React from 'react';

import { CoverageElement } from './components';
import { normalizeRedundantCoverageAttributes, parseSerializedElement } from './lib';
import type { CoverageExtensionConfiguration } from './types';

export const EXTENSION_ID = 'CoverageExtension';

export interface Parameters extends CoverageExtensionConfiguration {}

export const CoverageExtension = ({ dateFormat, fetchCoverage }: Parameters): Extension => ({
    id: EXTENSION_ID,
    deserialize: {
        element: {
            [COVERAGE_NODE_TYPE]: createDeserializeElement(parseSerializedElement),
        },
    },
    isRichBlock: isCoverageNode,
    isVoid: isCoverageNode,
    normalizeNode: normalizeRedundantCoverageAttributes,
    renderElement: ({ attributes, children, element }) => {
        if (isCoverageNode(element)) {
            return (
                <CoverageElement
                    attributes={attributes}
                    dateFormat={dateFormat}
                    element={element}
                    fetchCoverage={fetchCoverage}
                >
                    {children}
                </CoverageElement>
            );
        }

        return undefined;
    },
});
