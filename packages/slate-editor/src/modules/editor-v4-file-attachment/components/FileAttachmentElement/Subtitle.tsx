import { AttachmentNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import { formatBytes } from '../../../../lib';
import { isUsingCustomTitle } from '../../lib';

interface Props {
    className?: string;
    element: AttachmentNode;
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
