const unwrapElement = (element: Element): void => {
    // eslint-disable-next-line no-param-reassign
    element.outerHTML = element.innerHTML;
};

export default unwrapElement;
