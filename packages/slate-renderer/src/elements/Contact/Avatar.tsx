import classNames from 'classnames';
import React, { FunctionComponent, ImgHTMLAttributes } from 'react';

import { PersonFill } from '../../icons';

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    name?: string;
    src?: string | null;
}

const Avatar: FunctionComponent<Props> = ({ alt, className, name, src, title, ...props }) => {
    const commonProps = {
        className: classNames('prezly-slate-contact__avatar-image', className),
        title: title || name,
    };

    return (
        <div className="prezly-slate-contact__avatar">
            {src && <img alt={alt || name} src={src} {...commonProps} {...props} />}
            {!src && <PersonFill {...commonProps} />}
        </div>
    );
};

export default Avatar;
