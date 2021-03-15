import { EmbedElementType } from '../types';

import createEmbed from './createEmbed';
import isEmbedElement from './isEmbedElement';

export default function parseSerializedElement(serialized: string): EmbedElementType | undefined {
    const parsed = JSON.parse(serialized);

    if (isEmbedElement(parsed)) {
        return createEmbed(parsed.oembed, parsed.url);
    }

    return undefined;
}
