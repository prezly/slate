import classNames from 'classnames';
import React, { ButtonHTMLAttributes, FunctionComponent } from 'react';
import { useMeasure } from 'react-use';

import { MultilineEllipsis } from '../../components';
import { ArrowsAngleExpand } from '../../icons';

import './Rollover.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    caption?: string;
}

const LINE_HEIGHT = 22;
const MAX_CAPTION_LINES = 3;
const CAPTION_PADDING_TOP = 16;
const CAPTION_PADDING_BOTTOM = 8;
const CAPTION_PADDING_VERTICAL = CAPTION_PADDING_BOTTOM + CAPTION_PADDING_TOP;
const IDEAL_MAX_HEIGHT = MAX_CAPTION_LINES * LINE_HEIGHT;

const Rollover: FunctionComponent<Props> = ({
    caption = '',
    children,
    className,
    disabled,
    ...props
}) => {
    const [ref, { height }] = useMeasure<HTMLSpanElement>();
    const captionHeight = height - CAPTION_PADDING_VERTICAL;
    const maxHeight = height > 0 ? Math.min(IDEAL_MAX_HEIGHT, captionHeight) : IDEAL_MAX_HEIGHT;

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

                    <span className="prezly-slate-image-rollover__caption-text" ref={ref}>
                        <MultilineEllipsis maxHeight={maxHeight}>
                            {caption.trim()}
                        </MultilineEllipsis>
                    </span>
                </span>
            </span>
        </button>
    );
};

export default Rollover;
