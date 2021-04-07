import prepareUploadcareUrl from './prepareUploadcareUrl';
import effect from './effects';
import { ImageExtension, Options } from '../../../../types';

type Parameters = Pick<Options, 'imageDetails' | 'filename' | 'src' | 'effects'> & {
    size: number;
    format: ImageExtension;
};

const getSrcSet = ({ imageDetails, filename, src, size, format, effects = [] }: Parameters) => {
    const defaultImageUrl = prepareUploadcareUrl({
        width: size,
        imageDetails,
        filename,
        src,
        effects: [effect.resize(size), effect.format(format), ...effects],
    });
    const retinaImageUrl = prepareUploadcareUrl({
        width: size * 2,
        imageDetails,
        filename,
        src,
        effects: [effect.resize(size * 2), effect.format(format), ...effects],
    });

    return `${defaultImageUrl} 1x, ${retinaImageUrl} 2x`;
};

export default getSrcSet;
