import type { CoverageNode} from '@prezly/slate-types';
import { isCoverageNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';

export function updateCoverage(
    editor: SlateEditor,
    properties: Partial<Pick<CoverageNode, 'layout' | 'new_tab' | 'show_thumbnail'>>,
): void {
    editor.setNodes<CoverageNode>(properties, { match: isCoverageNode });
}
