const fixExternalImageSrc = (src: string) => {
    if (src.startsWith('//')) {
        return 'https:' + src;
    }

    return src;
};

export default fixExternalImageSrc;
