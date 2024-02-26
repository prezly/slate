import { BookmarkNode } from '@prezly/slate-types';
import { v4 as uuidV4 } from 'uuid';

type RequiredProps = Pick<BookmarkNode, 'url' | 'oembed'>;
type OptionalProps = Omit<BookmarkNode, 'type' | 'children'>;

function withoutExtraAttributes<T extends BookmarkNode>(node: T): BookmarkNode {
    const { type, children, layout, new_tab, show_thumbnail, uuid, url, oembed, ...extra } = node;
    if (Object.keys(extra).length === 0) {
        return node;
    }

    return { type, children, layout, new_tab, show_thumbnail, uuid, url, oembed };
}

export function createGalleryBookmark(props: RequiredProps & Partial<OptionalProps>): BookmarkNode {
    return withoutExtraAttributes({
        layout: BookmarkNode.Layout.VERTICAL,
        new_tab: false,
        show_thumbnail: true,
        uuid: uuidV4(),
        ...props,
        children: [{ text: '' }],
        type: BookmarkNode.TYPE,
    });
}
