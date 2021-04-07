import { ImageExtension, Options } from "../../../../types";

const DEFAULT_FORMATS: ImageExtension[] = ['webp', 'png'];

const getFormats = (options: Options) => {
    return options.formats || DEFAULT_FORMATS;
};

export default getFormats;