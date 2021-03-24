import { UploadcareImageStoragePayload } from '@prezly/uploadcare';
import { Node } from 'slate';

import { IMAGE_TYPE } from '../constants';
import { ImageElementType, ImageLayout } from '../types';

interface Options {
    children?: Node[];
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
): ImageElementType => ({
    children,
    file,
    href,
    layout,
    type: IMAGE_TYPE,
    width_factor,
    width,
});

export default createImage;
