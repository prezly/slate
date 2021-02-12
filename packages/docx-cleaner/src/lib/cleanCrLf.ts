const cleanCrLf = (html: string): string => {
    return html.replace(/\r\n/gm, '\n').replace(/\r/gm, '\n');
};

export default cleanCrLf;
