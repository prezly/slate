import classNames from 'classnames';
import React, { FunctionComponent } from 'react';

interface Props {
    children: string;
    className?: string;
    percent: string;
}

const Description: FunctionComponent<Props> = ({ children, className, percent }) => (
    <div className={classNames('loading-placeholder-v2__description', className)}>
        <span className="loading-placeholder-v2__message">{children}...</span>
        <span className="loading-placeholder-v2__progress">{percent}</span>
    </div>
);

export default Description;
