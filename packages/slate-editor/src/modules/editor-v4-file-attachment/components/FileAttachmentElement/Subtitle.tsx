import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import { formatBytes } from 'lib';

import { isUsingCustomTitle } from '../../lib';
import { FileAttachmentElementType } from '../../types';

interface Props {
    className?: string;
    element: FileAttachmentElementType;
}

const Subtitle: FunctionComponent<Props> = ({ className, element }) => (
    <div className={classNames('editor-v4-file-attachment-element__subtitle', className)}>
        {isUsingCustomTitle(element) ? (
            <>
                {element.file.filename} - {formatBytes(element.file.size)}
            </>
        ) : (
            formatBytes(element.file.size)
        )}
    </div>
);

export default Subtitle;
