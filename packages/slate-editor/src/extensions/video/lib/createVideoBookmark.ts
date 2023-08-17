import { VideoNode } from '@prezly/slate-types';
import { v4 as uuidV4 } from 'uuid';

type RequiredProps = Pick<VideoNode, 'url' | 'oembed'>;
type OptionaProps = Pick<VideoNode, 'uuid' | 'layout'>;

export function createVideoBookmark(props: RequiredProps & Partial<OptionaProps>): VideoNode {
    const { uuid = uuidV4(), url, oembed, layout = VideoNode.Layout.CONTAINED } = props;
    return {
        children: [{ text: '' }],
        type: VideoNode.TYPE, // disallowed to override type
        uuid,
        url,
        oembed,
        layout,
    };
}
