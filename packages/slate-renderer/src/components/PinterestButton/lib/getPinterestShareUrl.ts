interface Options {
    description?: string;
    url?: string;
    image?: string;
}

const getPinterestShareUrl = ({
    description = document.title,
    url = document.location.href,
    image,
}: Options): string => {
    const parameters = {
        description: encodeURIComponent(description),
        media: image ? encodeURIComponent(image) : undefined,
        url: encodeURIComponent(url),
    };

    const parametersString = Object.entries(parameters)
        .map((entry) => entry.join('='))
        .join('&');

    return `https://pinterest.com/pin/create/button/?${parametersString}`;
};

export default getPinterestShareUrl;
