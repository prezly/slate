import '@prezly/slate-types';

import { LoaderElementType } from 'src/modules/editor-v4-loader';
import { ImageCandidateElementType } from '../modules/editor-v4-image/types';

declare module '@prezly/slate-types' {
    interface AdditionalCustomTypes {
        Element: ImageCandidateElementType | LoaderElementType;
    }
}
