const parseHtmlElement = (html: string): Element | null => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.firstElementChild;
};

export default parseHtmlElement;
