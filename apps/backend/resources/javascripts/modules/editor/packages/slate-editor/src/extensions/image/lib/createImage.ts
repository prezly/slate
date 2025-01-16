import type { ImageNode } from '@prezly/slate-types';
import { Alignment, ImageLayout, IMAGE_NODE_TYPE } from '@prezly/slate-types';

export function createImage({
    file,
    children = [{ text: '' }],
    href = '',
    layout = ImageLayout.CONTAINED,
    align = Alignment.CENTER,
    new_tab = true,
    width = '100%',
}: Pick<ImageNode, 'file'> &
    Partial<
        Pick<ImageNode, 'children' | 'file' | 'href' | 'layout' | 'align' | 'new_tab' | 'width'>
    >): ImageNode {
    return {
        type: IMAGE_NODE_TYPE,
        children,
        file,
        href,
        layout,
        align,
        new_tab,
        width,
    };
}
