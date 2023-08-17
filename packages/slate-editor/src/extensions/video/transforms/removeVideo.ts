import { EditorCommands } from '@prezly/slate-commons';
import { VideoNode } from '@prezly/slate-types';
import type { Editor } from 'slate';

export function removeVideo(editor: Editor, element?: VideoNode): VideoNode | null {
    return EditorCommands.removeNode<VideoNode>(editor, {
        match: element ? (node) => node === element : VideoNode.isVideoNode,
    });
}
