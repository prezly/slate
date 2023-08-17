import type { VideoNode } from '@prezly/slate-types';
import type { Editor } from 'slate';
import { Transforms } from 'slate';

export function updateVideo(
    editor: Editor,
    video: VideoNode,
    patch: Partial<Pick<VideoNode, 'url' | 'oembed' | 'layout' | 'uuid'>>,
) {
    Transforms.setNodes<VideoNode>(editor, patch, {
        at: [],
        match: (node) => node === video,
    });
}
