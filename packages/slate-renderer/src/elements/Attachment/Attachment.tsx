import { AttachmentNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Attachment.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    description: AttachmentNode['description'];
    file: AttachmentNode['file'];
}

const Attachment: FunctionComponent<Props> = ({ children, className, ...props }) => (
    <div className={classNames('prezly-slate-attachment', className)} {...props}>
        {children}
    </div>
);

export default Attachment;
