import type { CoverageEntry } from '@prezly/sdk';
import type { CoverageNode } from '@prezly/slate-types';
import React, { useEffect } from 'react';
import { useSlateStatic, type RenderElementProps } from 'slate-react';

import { EditorBlock, ElementPlaceholder, LoadingPlaceholder } from '#components';
import { ChickenNoSignalIllustration, Coverage as CoverageIcon } from '#icons';
import { useAsyncFn } from '#lib';

import { HttpCodes } from '#modules/api';
import { EventsEditor } from '#modules/events';

import { removeCoverage } from '../lib';

import { CoverageCard } from './CoverageCard';
import styles from './CoverageElement.module.scss';
import { CoverageMenu } from './CoverageMenu';

// GET /v2/coverage/:id endpoint usually responds in 300-1000 ms
// Depending on whether it has an attachment or URL.
const ESTIMATED_LOADING_DURATION = 300;

interface Props extends RenderElementProps {
    /**
     * Moment.js-compatible format
     */
    dateFormat: string;
    element: CoverageNode;
    fetchCoverage: (id: CoverageEntry['id']) => Promise<CoverageEntry>;
    onEdit: (id: CoverageEntry['id']) => void;
}

export function CoverageElement({
    attributes,
    children,
    dateFormat,
    element,
    fetchCoverage,
    onEdit,
}: Props) {
    const editor = useSlateStatic();
    const coverageId = element.coverage.id;
    const [{ error, loading, value: coverage }, loadCoverage] = useAsyncFn(() => {
        return fetchCoverage(coverageId);
    }, [coverageId, fetchCoverage]);

    useEffect(() => {
        loadCoverage();
    }, [loadCoverage]);

    function handleEdit() {
        onEdit(coverageId);
    }

    function handleRemove() {
        if (removeCoverage(editor, element)) {
            EventsEditor.dispatchEvent(editor, 'coverage-removed', { uuid: element.uuid });
        }
    }

    return (
        <EditorBlock
            {...attributes}
            border={Boolean(coverage)}
            element={element}
            overlay="always"
            // We have to render children or Slate will fail when trying to find the node.
            renderAboveFrame={children}
            renderMenu={coverage ? () => (
                <CoverageMenu
                    coverage={coverage}
                    element={element}
                    onEdit={handleEdit}
                    onRemove={handleRemove}
                />
            ) : undefined}
            renderReadOnlyFrame={function () {
                if (loading) {
                    return (
                        <LoadingPlaceholder
                            className={styles.LoadingPlaceholder}
                            icon={CoverageIcon}
                            description="Loading Coverage"
                            estimatedDuration={ESTIMATED_LOADING_DURATION}
                        />
                    );
                }

                if (coverage) {
                    return <CoverageCard coverage={coverage} dateFormat={dateFormat} layout={element.layout} withThumbnail={element.show_thumbnail} />;
                }

                if (error && isNotFoundError(error)) {
                    return (
                        <ElementPlaceholder
                            title="The selected coverage no longer exists and will not be displayed"
                            illustration={<ChickenNoSignalIllustration />}
                            onDismiss={handleRemove}
                            onDismissLabel="Remove this coverage"
                        />
                    );
                }

                return (
                    <ElementPlaceholder
                        title="We have encountered a problem when loading your coverage"
                        subtitle="Click to try again"
                        illustration={<ChickenNoSignalIllustration />}
                        onClick={loadCoverage}
                        onClickLabel="Click to try again"
                        onDismiss={handleRemove}
                        onDismissLabel="Remove this coverage"
                    />
                );
            }}
            rounded
            void
        />
    );
}

function isNotFoundError(error: any): boolean {
    return error && typeof error === 'object' && error.status === HttpCodes.NOT_FOUND;
}
