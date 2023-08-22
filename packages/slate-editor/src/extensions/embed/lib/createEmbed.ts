import { v4 as uuidV4 } from 'uuid';

import { EmbedNode } from '../EmbedNode';

type RequiredProps = Pick<EmbedNode, 'url' | 'oembed'>;
type OptionalProps = Pick<EmbedNode, 'uuid' | 'layout'>;

export function createEmbed({
    url,
    oembed,
    uuid = uuidV4(),
    layout = EmbedNode.Layout.CONTAINED,
}: RequiredProps & Partial<OptionalProps>): EmbedNode {
    return {
        type: EmbedNode.TYPE,
        children: [{ text: '' }],
        oembed,
        url,
        uuid,
        layout,
    };
}
