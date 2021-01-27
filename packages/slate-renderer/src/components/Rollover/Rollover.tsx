import classNames from 'classnames';
import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';

import { ArrowsAngleExpand } from '../../icons';

import './Rollover.scss';

const Rollover: FunctionComponent<ButtonHTMLAttributes<HTMLButtonElement>> = ({
    children,
    className,
    disabled,
    ...props
}) => {
    if (disabled) {
        return <>{children}</>;
    }

    return (
        <button
            className={classNames('prezly-slate-image-rollover', className)}
            type="button"
            style={props.style}
            {...props}
        >
            <span className="prezly-slate-image-rollover__content">
                {children}

                <span className="prezly-slate-image-rollover__dim" />

                <span className="prezly-slate-image-rollover__caption">
                    <span className="prezly-slate-image-rollover__caption-icon-background">
                        <ArrowsAngleExpand className="prezly-slate-image-rollover__caption-icon" />
                    </span>
                </span>
            </span>
        </button>
    );
};

export default Rollover;
