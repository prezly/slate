import classNames from 'classnames';
import type { FunctionComponent } from 'react';
import React from 'react';

export interface Props {
    className?: string;
    percent: string;
}

const ProgressBar: FunctionComponent<Props> = ({ className, percent }) => (
    <div className={classNames('loading-placeholder-v2__progress-bar', className)}>
        <div className="loading-placeholder-v2__progress-bar-value" style={{ width: percent }} />
    </div>
);

export default ProgressBar;
