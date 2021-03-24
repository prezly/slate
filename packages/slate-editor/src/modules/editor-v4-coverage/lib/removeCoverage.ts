import { EditorCommands } from '@prezly/slate-commons';
import { Editor } from 'slate';

import { CoverageElementType } from '../types';

import isCoverageElement from './isCoverageElement';

const removeCoverage = (editor: Editor): CoverageElementType | null =>
    EditorCommands.removeNode<CoverageElementType>(editor, {
        match: isCoverageElement,
    });

export default removeCoverage;
