import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import { isUsingCustomTitle } from '../../lib';
import { FileAttachmentElementType } from '../../types';

interface Props {
    className?: string;
    element: FileAttachmentElementType;
}

const Title: FunctionComponent<Props> = ({ className, element }) => (
    <div className={classNames('editor-v4-file-attachment-element__title', className)}>
        {isUsingCustomTitle(element) ? element.description : element.file.filename}
    </div>
);

export default Title;
