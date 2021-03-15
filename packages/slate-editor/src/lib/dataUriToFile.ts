import isDataURI from 'validator/lib/isDataURI';

/**
 * @param dataUri A string matching the following pattern:
 *                data:[<mediatype>][;base64],<data>
 */
const dataUriToFile = (dataUri: string, filename = 'Untitled'): File => {
    if (!isDataURI(dataUri)) {
        throw new Error(`"${dataUri}" is not a valid data URI`);
    }

    const [prefix, data] = dataUri.split(',');
    const matches = prefix.match(/:(.*?);/);

    if (matches === null) {
        throw new Error(`"${dataUri}" is not a valid data URI`);
    }

    const [, mime] = matches;
    const binaryData = atob(data);
    const bits = new Uint8Array(binaryData.length);

    for (let i = binaryData.length - 1; i >= 0; --i) {
        bits[i] = binaryData.charCodeAt(i);
    }

    return new File([bits], filename, { type: mime });
};

export default dataUriToFile;
