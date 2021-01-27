import classNames from 'classnames';
import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';

import { ArrowsAngleExpand } from '../../icons';

import './Rollover.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    caption?: string;
}

const Rollover: FunctionComponent<Props> = ({
    caption = '',
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

                <span
                    className={classNames('prezly-slate-image-rollover__caption', {
                        'prezly-slate-image-rollover__caption--empty': !caption.trim(),
                    })}
                >
                    <span className="prezly-slate-image-rollover__caption-icon-container">
                        <ArrowsAngleExpand className="prezly-slate-image-rollover__caption-icon" />
                    </span>

                    <span className="prezly-slate-image-rollover__caption-text">
                        {caption.trim()}
                    </span>
                </span>
            </span>
        </button>
    );
};

export default Rollover;
