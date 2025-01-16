import { EditorCommands } from '@prezly/slate-commons';
import { VideoNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate-common';

export function removeVideo(editor: SlateEditor, element?: VideoNode): VideoNode | null {
    return EditorCommands.removeNode<VideoNode>(editor, {
        match: element ? (node) => node === element : VideoNode.isVideoNode,
    });
}
