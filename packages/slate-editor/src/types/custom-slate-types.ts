import '@prezly/slate-types';
import { HistoryEditor } from 'slate-history';

import { ImageCandidateElementType } from '../modules/editor-v4-image/types';
import { LoaderElementType } from '../modules/editor-v4-loader';
import { LinkCandidateElementType } from '../modules/editor-v4-rich-formatting/types';

declare module '@prezly/slate-types' {
    interface AdditionalCustomTypes {
        Editor: HistoryEditor;
        Element: ImageCandidateElementType | LinkCandidateElementType | LoaderElementType;
    }
}
