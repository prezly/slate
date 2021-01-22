import classNames from 'classnames';
import React, { FunctionComponent, HTMLAttributes } from 'react';

import { ArrowsAngleExpand } from '../../icons';

import './Rollover.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
}

const Rollover: FunctionComponent<Props> = ({ children, className, disabled, ...props }) => {
    if (disabled) {
        return <>{children}</>;
    }

    return (
        <div className={classNames('prezly-slate-image-rollover', className)} {...props}>
            {children}

            <div className="prezly-slate-image-rollover__caption">
                <ArrowsAngleExpand className="prezly-slate-image-rollover__caption-icon" />
            </div>
        </div>
    );
};

export default Rollover;
