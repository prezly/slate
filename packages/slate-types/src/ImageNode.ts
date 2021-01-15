import InlineNode from './InlineNode';
import { UploadcareImageStoragePayload } from './sdk';

export default interface ImageNode {
    /** caption */
    children: InlineNode[];
    file: UploadcareImageStoragePayload;
    /** empty string if no URL */
    href: string;
    layout: 'contained' | 'expanded' | 'full-width';
    type: 'image-block';
    /** matches this regexp: /^\d+(\.\d+)?%$/ */
    width: string;
    /** matches this regexp: /^\d+(\.\d+)?%$/ */
    width_factor: string;
}
