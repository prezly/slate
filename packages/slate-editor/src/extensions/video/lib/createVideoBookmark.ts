import { VideoNode } from '@prezly/slate-types';
import { v4 as uuidV4 } from 'uuid';

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
        ...props,
        children: [{ text: '' }],
        type: VideoNode.TYPE, // disallowed to override type
    });
}
