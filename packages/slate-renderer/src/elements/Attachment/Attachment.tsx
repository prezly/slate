import { AttachmentNode } from '@prezly/slate-types';
import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import { download } from '../../icons';
import { formatBytes } from '../../lib';

import './Attachment.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: never;
    description: AttachmentNode['description'];
    file: AttachmentNode['file'];
    styled?: boolean;
}

const Attachment: FunctionComponent<Props> = ({
    className,
    description,
    file,
    styled,
    ...props
}) => {
    const isUsingCustomTitle = Boolean(description);

    return (
        <div className={classNames('prezly-slate-attachment', className)} {...props}>
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
        </div>
    );
};

export default Attachment;
