const copyScriptAttributes = (source: HTMLScriptElement, target: HTMLScriptElement): void => {
    Array.from(source.attributes).forEach(({ name, value }) => {
        target.setAttribute(name, value);
    });
    // eslint-disable-next-line no-param-reassign
    target.innerText = source.innerText;
};

export default copyScriptAttributes;
