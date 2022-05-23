import type { AttachmentNode } from '@prezly/slate-types';
import React from 'react';

import { Download } from '#icons';
import { formatBytes } from '#lib';

import { isUsingCustomTitle } from '../../lib';

import styles from './FileAttachment.module.scss';

interface Props {
    element: AttachmentNode;
}

export function FileAttachment({ element }: Props) {
    return (
        <div className={styles.FileAttachment} contentEditable={false}>
            <div className={styles.IconContainer}>
                <Download className={styles.Icon} />
            </div>

            <div className={styles.Details}>
                <div className={styles.Title}>{element.file.filename}</div>
                <div className={styles.Subtitle}>
                    {isUsingCustomTitle(element) ? (
                        <>
                            {element.description} - {formatBytes(element.file.size)}
                        </>
                    ) : (
                        formatBytes(element.file.size)
                    )}
                </div>
            </div>
        </div>
    );
}
