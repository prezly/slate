import { ImageNode, IMAGE_NODE_TYPE, InlineNode, TextNode } from '@prezly/slate-types';
import { UploadcareImageStoragePayload } from '@prezly/uploadcare';

import { ImageLayout } from '../types';

interface Options {
    children?: (InlineNode | TextNode)[];
    href?: string;
    layout?: ImageLayout;
    width_factor?: string;
    width?: string;
}

const createImage = (
    file: UploadcareImageStoragePayload,
    {
        children = [{ text: '' }],
        href = '',
        layout = ImageLayout.CONTAINED,
        width = '100%',
        width_factor = '100%',
    }: Options = {},
): ImageNode => ({
    children,
    file,
    href,
    layout,
    type: IMAGE_NODE_TYPE,
    width_factor,
    width,
});

export default createImage;
