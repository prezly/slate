import { BookmarkNode } from '@prezly/slate-types';
import { v4 as uuidV4 } from 'uuid';

type RequiredProps = Pick<BookmarkNode, 'url' | 'oembed'>;

export function createGalleryBookmark(props: RequiredProps): BookmarkNode {
    return {
        ...props,
        layout: BookmarkNode.Layout.VERTICAL,
        new_tab: true,
        show_thumbnail: true,
        uuid: uuidV4(),
        children: [{ text: '' }],
        type: BookmarkNode.TYPE,
    };
}
