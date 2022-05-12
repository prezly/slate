import type { Coverage } from '@prezly/sdk';
import type { CoverageNode } from '@prezly/slate-types';
import React, { useEffect } from 'react';
import type { RenderElementProps } from 'slate-react';

import { EditorBlock, ElementPlaceholder, LoadingPlaceholderV2 } from '#components';
import { ChickenNoSignalIllustration, Coverage as CoverageIcon } from '#icons';
import { useAsyncFn } from '#lib';

import { HttpCodes } from '#modules/api';

import { CoverageCard } from './CoverageCard';
import styles from './CoverageElement.module.scss';

// GET /v2/coverage/:id endpoint usually responds in 300-1000 ms
// Depending on whether it has an attachment or URL.
const ESTIMATED_LOADING_DURATION = 300;

interface Props extends RenderElementProps {
    /**
     * Moment.js-compatible format
     */
    dateFormat: string;
    element: CoverageNode;
    fetchCoverage: (id: Coverage['id']) => Promise<Coverage>;
}

export function CoverageElement({
    attributes,
    children,
    dateFormat,
    element,
    fetchCoverage,
}: Props) {
    const coverageId = element.coverage.id;
    const [{ error, loading, value: coverage }, loadCoverage] = useAsyncFn(() => {
        return fetchCoverage(coverageId);
    }, [coverageId, fetchCoverage]);

    useEffect(() => {
        loadCoverage();
    }, [loadCoverage]);

    return (
        <EditorBlock
            {...attributes}
            border
            element={element}
            renderBlock={function () {
                if (loading) {
                    return (
                        <LoadingPlaceholderV2.Placeholder
                            className={styles.loadingPlaceholder}
                            estimatedDuration={ESTIMATED_LOADING_DURATION}
                        >
                            {({ percent }) => (
                                <>
                                    <LoadingPlaceholderV2.Icon icon={CoverageIcon} />
                                    <LoadingPlaceholderV2.Description percent={percent}>
                                        Loading Coverage
                                    </LoadingPlaceholderV2.Description>
                                    <LoadingPlaceholderV2.ProgressBar percent={percent} />
                                </>
                            )}
                        </LoadingPlaceholderV2.Placeholder>
                    );
                }

                if (coverage) {
                    return <CoverageCard coverage={coverage} dateFormat={dateFormat} />;
                }

                if (error && isNotFoundError(error)) {
                    return (
                        <ElementPlaceholder
                            illustration={<ChickenNoSignalIllustration />}
                            title="The selected coverage no longer exists and will not be displayed"
                        />
                    );
                }

                return (
                    <ElementPlaceholder
                        onClick={loadCoverage}
                        illustration={<ChickenNoSignalIllustration />}
                        title="We have encountered a problem when loading your coverage"
                        subtitle="Click to try again"
                    />
                );
            }}
            rounded
            void
        >
            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </EditorBlock>
    );
}

function isNotFoundError(error: any): boolean {
    return error && typeof error === 'object' && error.status === HttpCodes.NOT_FOUND;
}
