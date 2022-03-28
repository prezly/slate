import type { ImageNode } from '@prezly/slate-types';
import { ImageLayout, IMAGE_NODE_TYPE } from '@prezly/slate-types';

export function createImage({
    file,
    children = [{ text: '' }],
    href = '',
    layout = ImageLayout.CONTAINED,
    width = '100%',
}: Pick<ImageNode, 'file'> & Partial<Omit<ImageNode, 'type'>>): ImageNode {
    return {
        type: IMAGE_NODE_TYPE,
        children,
        file,
        href,
        layout,
        width,
    };
}
