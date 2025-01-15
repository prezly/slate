import type { VideoNode } from '@prezly/slate-types';
import type { SlateEditor } from '@udecode/plate';

export function updateVideo(
    editor: SlateEditor,
    video: VideoNode,
    patch: Partial<Pick<VideoNode, 'url' | 'oembed' | 'layout' | 'uuid'>>,
) {
    editor.tf.setNodes<VideoNode>(patch, {
        at: [],
        match: (node) => node === video,
    });
}
