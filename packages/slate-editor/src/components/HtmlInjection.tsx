import React, { FunctionComponent, useEffect, useRef } from 'react';
import { useLatest } from 'react-use';
import { injectOembedMarkup } from '../modules/editor-v4-embed/lib';

interface Props {
    html: string;
    className?: string;
    onError: () => void;
}

export const HtmlInjection: FunctionComponent<Props> = (props) => {
    const { html, className } = props;
    const freshProps = useLatest<Props>(props);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            injectOembedMarkup({
                html,
                onError: () => freshProps.current.onError(),
                target: ref.current,
            });
        }
    }, [html]);

    return (
        <div className={className} ref={ref} />
    );
};
