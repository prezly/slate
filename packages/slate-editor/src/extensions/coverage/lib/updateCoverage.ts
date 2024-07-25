import type { CoverageNode} from '@prezly/slate-types';
import { isCoverageNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

export function updateCoverage(
    editor: Editor,
    properties: Partial<Pick<CoverageNode, 'layout' | 'new_tab' | 'show_thumbnail'>>,
): void {
    Transforms.setNodes<CoverageNode>(editor, properties, { match: isCoverageNode });
}
