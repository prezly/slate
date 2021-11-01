import { EditorCommands } from '@prezly/slate-commons';
import { CoverageNode, isCoverageNode } from '@prezly/slate-types';
import { Editor } from 'slate';


const removeCoverage = (editor: Editor): CoverageNode | null =>
    EditorCommands.removeNode<CoverageNode>(editor, {
        match: isCoverageNode,
    });

export default removeCoverage;
