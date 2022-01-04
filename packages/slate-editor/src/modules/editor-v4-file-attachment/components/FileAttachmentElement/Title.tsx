import type { AttachmentNode } from '@prezly/slate-types';
import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';

import { isUsingCustomTitle } from '../../lib';

interface Props {
    className?: string;
    element: AttachmentNode;
}

export const Title: FunctionComponent<Props> = ({ className, element }) => (
    <div className={classNames('editor-v4-file-attachment-element__title', className)}>
        {isUsingCustomTitle(element) ? element.description : element.file.filename}
    </div>
);
