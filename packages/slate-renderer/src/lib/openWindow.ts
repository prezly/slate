const openWindow = (url: string, width?: number, height?: number): Window | null => {
    let result: Window | null = null;

    if (width && height) {
        const left = (document.documentElement.clientWidth - width) / 2;
        const top = (document.documentElement.clientHeight - height) / 2;
        const options = {
            status: 1,
            resizable: 'yes',
            width,
            height,
            top,
            left,
        };
        const optionsString = Object.entries(options)
            .map((entry) => entry.join('='))
            .join(',');
        result = window.open(url, '', optionsString);
    } else {
        result = window.open(url);
    }

    if (result) {
        result.focus();
    }

    return result;
};

export default openWindow;
