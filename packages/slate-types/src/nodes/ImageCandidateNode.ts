import { Element } from 'slate';

import ElementNode from './ElementNode';
import TextNode from './TextNode';

export const IMAGE_CANDIDATE_TYPE = 'image-block-candidate';

/**
 * Image Candidate Element is just an ephemeral node which exists inbetween deserialization
 * and updating editor value. It's sole purpose is to glue deserialization
 * (where we have access to <img> elements but we don't have access to editor instance)
 * and normalization (which is responsible for converting these nodes into actual images).
 */
export default interface ImageCandidateNode extends ElementNode<typeof IMAGE_CANDIDATE_TYPE> {
    children: TextNode[];
    /** empty string if no URL */
    href: string;
    src: string;
}

export const isImageCandidateNode = (value: any): value is ImageCandidateNode =>
    Element.isElement(value) && value.type === IMAGE_CANDIDATE_TYPE;
