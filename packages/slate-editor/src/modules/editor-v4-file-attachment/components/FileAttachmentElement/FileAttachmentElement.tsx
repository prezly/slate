import type { AttachmentNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';
import type { RenderElementProps } from 'slate-react';
import { useSelected } from 'slate-react';

import { Download } from '#icons';

import './FileAttachmentElement.scss';
import { Subtitle } from './Subtitle';
import { Title } from './Title';

interface Props extends RenderElementProps {
    element: AttachmentNode;
    styled: boolean;
}

export const FileAttachmentElement: FunctionComponent<Props> = ({
    attributes,
    children,
    element,
    styled,
}) => {
    const isSelected = useSelected();

    return (
        <div
            {...attributes}
            className={classNames('editor-v4-file-attachment-element', {
                'editor-v4-file-attachment-element--active': isSelected,
                'editor-v4-file-attachment-element--unstyled': !styled,
            })}
            data-slate-type={element.type}
            data-slate-value={JSON.stringify(element)}
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

            {/* We have to render children or Slate will fail when trying to find the node. */}
            {children}
        </div>
    );
};
