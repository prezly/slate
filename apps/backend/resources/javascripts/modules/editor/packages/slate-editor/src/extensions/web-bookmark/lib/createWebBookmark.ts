import { BookmarkNode } from '@prezly/slate-types';
import { v4 as uuidV4 } from 'uuid';

type RequiredProps = Pick<BookmarkNode, 'url' | 'oembed'>;
type OptionalProps = Omit<BookmarkNode, 'type' | 'url' | 'oembed'>;

function withoutExtraAttributes<T extends BookmarkNode>(node: T): BookmarkNode {
    const { type, uuid, url, oembed, show_thumbnail, layout, new_tab, children, ...extra } = node;
    if (Object.keys(extra).length === 0) {
        return node;
    }
    return { type, uuid, url, oembed, show_thumbnail, layout, new_tab, children };
}

export function createWebBookmark(props: RequiredProps & Partial<OptionalProps>): BookmarkNode {
    return withoutExtraAttributes({
        uuid: uuidV4(),
        layout: BookmarkNode.Layout.HORIZONTAL,
        new_tab: true,
        show_thumbnail: true,
        ...props,
        children: [{ text: '' }],
        type: BookmarkNode.TYPE, // disallowed to override type
    });
}
