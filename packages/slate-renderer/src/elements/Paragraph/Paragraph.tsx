import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import './Paragraph.scss';

const Paragraph: FunctionComponent<HTMLAttributes<HTMLParagraphElement>> = ({
    children,
    className,
    ...props
}) => (
    <p className={classNames('prezly-slate-paragraph', className)} {...props}>
        {children}
    </p>
);

export default Paragraph;
