import type { AttachmentNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';
import { useSelected } from 'slate-react';

import { Download } from '#icons';

import styles from './FileAttachment.module.scss';
import { Subtitle } from './Subtitle';
import { Title } from './Title';

interface Props {
    element: AttachmentNode;
    styled: boolean;
}

export const FileAttachment: FunctionComponent<Props> = ({ element, styled }) => {
    const isSelected = useSelected();

    return (
        <div
            className={classNames(styles['file-attachment-element'], {
                [styles['file-attachment-element--active']]: isSelected,
                [styles['file-attachment-element--unstyled']]: !styled,
            })}
        >
            <div className={styles.content} contentEditable={false}>
                {styled && (
                    <div className={styles['icon-container']}>
                        <Download className={styles.icon} />
                    </div>
                )}

                <div className={styles.details}>
                    <Title
                        className={classNames({
                            [styles['text--unstyled']]: !styled,
                        })}
                        element={element}
                    />
                    <Subtitle
                        className={classNames({
                            [styles['text--unstyled']]: !styled,
                        })}
                        element={element}
                    />
                </div>
            </div>
        </div>
    );
};
