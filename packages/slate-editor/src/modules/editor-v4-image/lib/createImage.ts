import type { ImageNode } from '@prezly/slate-types';
import { ImageLayout, IMAGE_NODE_TYPE } from '@prezly/slate-types';

type Parameters = Partial<Omit<ImageNode, 'file' | 'type'>> & Pick<ImageNode, 'file'>;

export function createImage({
    file,
    href = '',
    layout = ImageLayout.CONTAINED,
    width = '100%',
    width_factor = '100%',
    children = [{ text: '' }],
}: Parameters): ImageNode {
    return {
        type: IMAGE_NODE_TYPE,
        children,
        file,
        href,
        layout,
        width_factor,
        width,
    };
}
