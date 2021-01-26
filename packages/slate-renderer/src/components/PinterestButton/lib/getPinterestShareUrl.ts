const getPinterestShareUrl = (
    description: string,
    url = document.location.href,
    image?: string,
): string => {
    const parameters = {
        description: encodeURIComponent(description),
        media: image ? encodeURIComponent(image) : undefined,
        url: encodeURIComponent(url),
    };

    const parametersString = Object.entries(parameters)
        .filter(([value]) => value)
        .map((entry) => entry.join('='))
        .join('&');

    return `https://pinterest.com/pin/create/button/?${parametersString}`;
};

export default getPinterestShareUrl;
