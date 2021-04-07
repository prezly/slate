import { Options } from '../../../../types';
import effect from './effects';
import getFormats from './getFormats';
import getSizes from './getSizes';
import getSrcSet from './getSrcSet';
import prepareUploadcareUrl from './prepareUploadcareUrl';

const getPictureImageDetails = (options: Options) => {
    const { imageDetails, filename, src, defaultFormat, effects = [], width } = options;

    const sizes = getSizes(options);

    const formats = getFormats(options);
    const format = defaultFormat || formats[0];

    return {
        srcSet: getSrcSet({
            imageDetails,
            filename,
            src,
            format: format,
            size: width || sizes.default,
            effects: effects,
        }),
        src: prepareUploadcareUrl({
            width: width || sizes.default,
            imageDetails,
            src,
            filename,
            effects: [effect.resize(width || sizes.default), effect.format(format), ...effects],
        }),
    };
};

export default getPictureImageDetails;
