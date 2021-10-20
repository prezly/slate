import { AttachmentNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

import { isUsingCustomTitle } from '../../lib';

interface Props {
    className?: string;
    element: AttachmentNode;
}

const Title: FunctionComponent<Props> = ({ className, element }) => (
    <div className={classNames('editor-v4-file-attachment-element__title', className)}>
        {isUsingCustomTitle(element) ? element.description : element.file.filename}
    </div>
);

export default Title;
