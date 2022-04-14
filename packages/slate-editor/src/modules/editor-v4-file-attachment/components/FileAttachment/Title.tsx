import type { AttachmentNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';

import styles from './FileAttachment.module.scss';

interface Props {
    className?: string;
    element: AttachmentNode;
}

export const Title: FunctionComponent<Props> = ({ className, element }) => (
    <div className={classNames(styles.title, className)}>
        {element.file.filename}
    </div>
);
