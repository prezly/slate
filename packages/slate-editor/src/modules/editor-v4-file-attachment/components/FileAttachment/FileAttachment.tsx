import type { AttachmentNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';
import { useSelected } from 'slate-react';

import { Download } from '#icons';

import './FileAttachment.scss';
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
            className={classNames('editor-v4-file-attachment-element', {
                'editor-v4-file-attachment-element--active': isSelected,
                'editor-v4-file-attachment-element--unstyled': !styled,
            })}
        >
            <div className="editor-v4-file-attachment-element__content" contentEditable={false}>
                {styled && (
                    <div className="editor-v4-file-attachment-element__icon-container">
                        <Download className="editor-v4-file-attachment-element__icon" />
                    </div>
                )}

                <div className="editor-v4-file-attachment-element__details">
                    <Title
                        className={classNames({
                            'editor-v4-file-attachment-element__text--unstyled': !styled,
                        })}
                        element={element}
                    />
                    <Subtitle
                        className={classNames({
                            'editor-v4-file-attachment-element__text--unstyled': !styled,
                        })}
                        element={element}
                    />
                </div>
            </div>
        </div>
    );
};
