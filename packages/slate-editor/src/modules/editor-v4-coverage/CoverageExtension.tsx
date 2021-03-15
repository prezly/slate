import { createDeserializeElement, Extension } from '@prezly/slate-commons';
import React from 'react';
import { RenderElementProps } from 'slate-react';

import { CoverageElement, CoverageMenu } from './components';
import { COVERAGE_EXTENSION_ID, COVERAGE_TYPE } from './constants';
import {
    isCoverageElement,
    normalizeRedundantCoverageAttributes,
    parseSerializedElement,
} from './lib';
import { CoverageParameters } from './types';

const CoverageExtension = ({
    containerRef,
    dateFormat,
    fetchCoverage,
}: CoverageParameters): Extension => ({
    deserialize: {
        element: {
            [COVERAGE_TYPE]: createDeserializeElement(parseSerializedElement),
        },
    },
    id: COVERAGE_EXTENSION_ID,
    normalizers: [normalizeRedundantCoverageAttributes],
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
        if (isCoverageElement(element)) {
            return (
                <>
                    {attributes.ref.current && (
                        <CoverageMenu
                            containerRef={containerRef}
                            element={attributes.ref.current}
                        />
                    )}
                    <CoverageElement
                        attributes={attributes}
                        dateFormat={dateFormat}
                        element={element}
                        fetchCoverage={fetchCoverage}
                    >
                        {children}
                    </CoverageElement>
                </>
            );
        }

        return undefined;
    },
    rootTypes: [COVERAGE_TYPE],
    voidTypes: [COVERAGE_TYPE],
});

export default CoverageExtension;
