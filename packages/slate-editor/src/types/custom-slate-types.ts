import '@prezly/slate-types';

import { ImageCandidateElementType } from '../modules/editor-v4-image/types';
import { LoaderElementType } from '../modules/editor-v4-loader';
import { LinkCandidateElementType } from '../modules/editor-v4-rich-formatting/types';

declare module '@prezly/slate-types' {
    interface AdditionalCustomTypes {
        Element: ImageCandidateElementType | LinkCandidateElementType | LoaderElementType;
    }
}
