import { AttachmentNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import { download } from '../../icons';
import { formatBytes, getUploadcareCdnUrl } from '../../lib';

import './Attachment.scss';

interface Props extends HTMLAttributes<HTMLAnchorElement> {
    children?: never;
    description: AttachmentNode['description'];
    file: AttachmentNode['file'];
    styled?: boolean;
    uuid: AttachmentNode['uuid'];
}

const Attachment: FunctionComponent<Props> = ({
    className,
    description,
    file,
    styled,
    uuid,
    ...props
}) => {
    const isUsingCustomTitle = Boolean(description);
    const href = getUploadcareCdnUrl(file, { download: true });

    return (
        <a className={classNames('prezly-slate-attachment', className)} href={href} {...props}>
            <div className="prezly-slate-attachment__content">
                {styled && (
                    <div className="prezly-slate-attachment__icon-container">
                        <img className="prezly-slate-attachment__icon" src={download} />
                    </div>
                )}

                <div className="prezly-slate-attachment__details">
                    <div
                        className={classNames('prezly-slate-attachment__title', {
                            'prezly-slate-attachment__title--unstyled': !styled,
                        })}
                    >
                        {isUsingCustomTitle ? description : file.filename}
                    </div>

                    <div
                        className={classNames('prezly-slate-attachment__subtitle', {
                            'prezly-slate-attachment__subtitle--unstyled': !styled,
                        })}
                    >
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
