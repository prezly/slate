import type { VideoNode } from '@prezly/slate-types';
import { VIDEO_NODE_TYPE } from '@prezly/slate-types';
import { v4 as uuidV4 } from 'uuid';

const EMPTY_TEXT = { text: '' };

type RequiredProps = Pick<VideoNode, 'url' | 'oembed'>;

function withoutExtraAttributes<T extends VideoNode>(node: T): VideoNode {
    const { type, uuid, url, oembed, children, ...extra } = node;
    if (Object.keys(extra).length === 0) {
        return node;
    }
    return { type, uuid, url, oembed, children };
}

export function createVideoBookmark(props: RequiredProps): VideoNode {
    return withoutExtraAttributes({
        uuid: uuidV4(),
        children: [EMPTY_TEXT],
        ...props,
        type: VIDEO_NODE_TYPE, // disallowed to override type
    });
}
