import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import { RenderElementProps, useSelected } from 'slate-react';

import { SvgIcon } from 'components';
import { download } from 'icons';

import { FileAttachmentElementType } from '../../types';

import Subtitle from './Subtitle';
import Title from './Title';

interface Props extends RenderElementProps {
    element: FileAttachmentElementType;
    styled: boolean;
}

const FileAttachmentElement: FunctionComponent<Props> = ({
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
                        <SvgIcon
                            className="editor-v4-file-attachment-element__icon"
                            icon={download}
                        />
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

export default FileAttachmentElement;
