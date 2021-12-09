import type { Coverage } from '@prezly/sdk';
import type { CoverageNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React, { useEffect } from 'react';
import { useAsyncFn } from 'react-use';
import type { RenderElementProps } from 'slate-react';
import { useSelected } from 'slate-react';

import { LoadingPlaceholderV2 } from '../../../../components';
import { Coverage as CoverageIcon } from '../../../../icons';
import type { ApiError } from '../../../../modules/api';

import CoverageBlock from './CoverageBlock';
import './CoverageElement.scss';
import FetchingError from './FetchingError';

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

const CoverageElement: FunctionComponent<Props> = ({
    attributes,
    children,
    dateFormat,
    element,
    fetchCoverage,
}) => {
    const isSelected = useSelected();
    const coverageId = element.coverage.id;
    const [{ error, loading, value: coverage }, loadCoverage] = useAsyncFn(() => {
        return fetchCoverage(coverageId);
    }, [coverageId, fetchCoverage]);

    useEffect(() => {
        loadCoverage();
    }, [loadCoverage]);

    return (
        <div
            {...attributes}
            className={classNames('editor-v4-coverage-element', {
                'editor-v4-coverage-element--active': isSelected,
                'editor-v4-coverage-element--error': error,
            })}
            data-slate-type={element.type}
            data-slate-value={JSON.stringify(element)}
        >
            <div contentEditable={false}>
                {error && (
                    <FetchingError
                        className="editor-v4-coverage-element__error"
                        error={error as ApiError}
                        onRetry={loadCoverage}
                    />
                )}

                {loading && (
                    <LoadingPlaceholderV2
                        className="editor-v4-coverage-element__loading-placeholder"
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
                    </LoadingPlaceholderV2>
                )}

                {coverage && <CoverageBlock coverage={coverage} dateFormat={dateFormat} />}
            </div>

            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </div>
    );
};

export default CoverageElement;
