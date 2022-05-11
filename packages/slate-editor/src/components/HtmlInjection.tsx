import type { FunctionComponent } from 'react';
import React, { useEffect, useRef } from 'react';

import { useLatest } from '#lib';

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

    return <div className={className} ref={ref} />;
};

export function injectOembedMarkup({
    html,
    onError,
    target,
}: {
    html: string | undefined;
    onError: () => void;
    target: HTMLElement;
}): void {
    const container = document.createElement('div');
    container.innerHTML = html || '';
    const embedScripts = Array.from(container.getElementsByTagName('script'));

    embedScripts.forEach((embedScript) => {
        const script = document.createElement('script');
        copyScriptAttributes(embedScript, script);
        script.addEventListener('error', onError);

        document.body.appendChild(script);
        // Remove the original script so it's not loaded twice.
        embedScript.remove();
    });

    // eslint-disable-next-line no-param-reassign
    target.innerHTML = container.innerHTML;
}

function copyScriptAttributes(source: HTMLScriptElement, target: HTMLScriptElement) {
    Array.from(source.attributes).forEach(({ name, value }) => {
        target.setAttribute(name, value);
    });
    // eslint-disable-next-line no-param-reassign
    target.innerText = source.innerText;
}
