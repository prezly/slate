import { Coverage } from '@prezly/sdk';
import classNames from 'classnames';
import moment from 'moment';
import React, { FunctionComponent } from 'react';

import { MultilineEllipsis } from '../../../../../components';

import {
    getCoverageDescription,
    getCoverageImageUrl,
    getCoverageTitle,
    hasOnlyFileAttachment,
} from '../../../lib';

import './CoverageBlock.scss';

const IMAGE_HEIGHT = 160;
const TITLE_MAX_HEIGHT = 44; // 2 * line-height of 'editor-v4-coverage-block__title'
const DESCRIPTION_MAX_HEIGHT = 40; // 2 * line-height of 'editor-v4-coverage-block__description'

interface Props {
    coverage: Coverage;
    /**
     * Moment.js-compatible format
     */
    dateFormat: string;
}

const CoverageBlock: FunctionComponent<Props> = ({ coverage, dateFormat }) => {
    const title = getCoverageTitle(coverage);
    const description = getCoverageDescription(coverage);
    const imageUrl = getCoverageImageUrl(coverage, IMAGE_HEIGHT);

    return (
        <div className="editor-v4-coverage-block">
            {imageUrl && (
                <div className="editor-v4-coverage-block__image-container">
                    <img alt={title} className="editor-v4-coverage-block__image" src={imageUrl} />
                </div>
            )}

            <div className="editor-v4-coverage-block__content">
                <div className="editor-v4-coverage-block__title">
                    <MultilineEllipsis maxHeight={TITLE_MAX_HEIGHT}>{title}</MultilineEllipsis>
                </div>

                {description && (
                    <div
                        className={classNames('editor-v4-coverage-block__description', {
                            'editor-v4-coverage-block__description--secondary': hasOnlyFileAttachment(
                                coverage,
                            ),
                        })}
                    >
                        <MultilineEllipsis maxHeight={DESCRIPTION_MAX_HEIGHT}>
                            {description}
                        </MultilineEllipsis>
                    </div>
                )}

                <div className="editor-v4-coverage-block__info">
                    {coverage.organisation_contact && (
                        <div className="editor-v4-coverage-block__outlet" title="Outlet">
                            <img
                                alt={coverage.organisation_contact.display_name}
                                className="editor-v4-coverage-block__outlet-image"
                                src={coverage.organisation_contact.avatar_url}
                            />
                            {coverage.organisation_contact.display_name}
                        </div>
                    )}

                    {coverage.author_contact && (
                        <div className="editor-v4-coverage-block__author" title="Author">
                            {coverage.author_contact.display_name}
                        </div>
                    )}

                    {coverage.published_at && (
                        <div
                            className="editor-v4-coverage-block__publication-date"
                            title="Publication date"
                        >
                            {moment(coverage.published_at).format(dateFormat)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoverageBlock;
