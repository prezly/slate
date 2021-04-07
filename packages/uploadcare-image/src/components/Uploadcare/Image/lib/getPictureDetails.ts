import { Options, PictureDetails } from '../../../../types';
import getPictureImageDetails from './getPictureImageDetails';
import getPictureSources from './getPictureSources';

const getPictureDetails = (options: Options): PictureDetails => ({
    sources: getPictureSources(options),
    image: getPictureImageDetails(options),
});

export default getPictureDetails;
