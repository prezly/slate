import type { AttachmentNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';

import { formatBytes } from '#lib';

import { isUsingCustomTitle } from '../../lib';

import styles from './FileAttachment.module.scss';

interface Props {
    className?: string;
    element: AttachmentNode;
}

export const Subtitle: FunctionComponent<Props> = ({ className, element }) => (
    <div className={classNames(styles.subtitle, className)}>
        {isUsingCustomTitle(element) ? (
            <>
                {element.file.filename} - {formatBytes(element.file.size)}
            </>
        ) : (
            formatBytes(element.file.size)
        )}
    </div>
);
