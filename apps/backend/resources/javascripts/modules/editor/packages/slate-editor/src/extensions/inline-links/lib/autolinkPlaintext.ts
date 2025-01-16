import { type Node } from '@udecode/plate';
import validator from 'validator';

import { matchUrls } from '#lib';

import { createLink } from './createLink';

/**
 * @returns {Node[]|string} Slate fragment if there are linkable URLs,
 *                          or undefined if no changes can be applied.
 */
export function autolinkPlaintext(content: string): Node[] | undefined {
    const matches = Array.from(matchUrls(content));

    if (matches.length > 0) {
        return Array.from(generateFragment(content, matches));
    }

    return undefined;
}

function* generateFragment(content: string, matches: RegExpMatchArray[]) {
    let offset = 0;

    while (matches.length > 0) {
        const match = matches.shift()!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
        const { index = 0 } = match;

        if (index > offset) {
            yield { text: content.substring(offset, match.index) };
            offset = index;
        }

        yield createLink({ href: withProtocol(match[0]), children: [{ text: match[0] }] });

        offset += match[0].length;
    }

    if (offset < content.length) {
        yield { text: content.substring(offset) };
    }
}

function withProtocol(url: string): string {
    if (!url.includes('://')) {
        return `https://${url}`;
    }

    if (
        validator.isURL(url, { require_protocol: false }) &&
        !validator.isURL(url, { require_protocol: true })
    ) {
        return `https://${url}`;
    }

    return url;
}
