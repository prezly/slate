import classNames from 'classnames';
import React, { FunctionComponent, ImgHTMLAttributes } from 'react';

import { personFill } from '../../icons';

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    name?: string;
    src?: string | null;
}

const Avatar: FunctionComponent<Props> = ({ alt, className, name, src, title, ...props }) => (
    <div className="prezly-slate-contact__avatar">
        <img
            alt={alt || name}
            className={classNames('prezly-slate-contact__avatar-image', className, {
                'prezly-slate-contact__avatar-image--empty': !src,
            })}
            src={src || personFill}
            title={title || name}
            {...props}
        />
    </div>
);

export default Avatar;
