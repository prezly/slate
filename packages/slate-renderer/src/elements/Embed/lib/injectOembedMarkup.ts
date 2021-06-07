import { OEmbedInfo } from '@prezly/sdk';

import copyScriptAttributes from './copyScriptAttributes';

interface Parameters {
    oembed: OEmbedInfo;
    onError: () => void;
    target: HTMLElement;
}

const injectOembedMarkup = ({ oembed, onError, target }: Parameters): void => {
    const container = document.createElement('div');
    container.innerHTML = oembed.html || '';
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
};

export default injectOembedMarkup;
