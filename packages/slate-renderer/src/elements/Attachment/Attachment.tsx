import { AttachmentNode, UploadcareFile } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import { Download } from '../../icons';
import { formatBytes } from '../../lib';

import './Attachment.scss';

interface Props extends HTMLAttributes<HTMLAnchorElement> {
    children?: never;
    node: AttachmentNode;
}

const Attachment: FunctionComponent<Props> = ({ className, children, node, ...props }) => {
    const { description, file } = node;
    const attachment = UploadcareFile.createFromPrezlyStoragePayload(file);
    const isUsingCustomTitle = Boolean(description);

    return (
        <a
            className={classNames('prezly-slate-attachment', className)}
            href={attachment.downloadUrl}
            {...props}
        >
            <div className="prezly-slate-attachment__content">
                <div className="prezly-slate-attachment__icon-container">
                    <Download className="prezly-slate-attachment__icon" />
                </div>

                <div className="prezly-slate-attachment__details">
                    <div className="prezly-slate-attachment__title">
                        {isUsingCustomTitle ? description : file.filename}
                    </div>

                    <div className="prezly-slate-attachment__subtitle">
                        {isUsingCustomTitle
                            ? `${file.filename} - ${formatBytes(file.size)}`
                            : formatBytes(file.size)}
                    </div>
                </div>
            </div>
        </a>
    );
};

export default Attachment;
