import { EditorCommands } from '@prezly/slate-commons';
import { CoverageNode } from '@prezly/slate-types';
import { Editor } from 'slate';

import isCoverageElement from './isCoverageElement';

const removeCoverage = (editor: Editor): CoverageNode | null =>
    EditorCommands.removeNode<CoverageNode>(editor, {
        match: isCoverageElement,
    });

export default removeCoverage;
