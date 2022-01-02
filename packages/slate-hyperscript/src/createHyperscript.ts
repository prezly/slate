import type { HyperscriptCreators, HyperscriptShorthands } from './slate-hyperscript';
import { createHyperscript as createSlateHyperscript } from './slate-hyperscript';
import { createText } from './slate-hyperscript/creators';

export function createHyperscript(
    options: {
        creators?: HyperscriptCreators;
        elements?: HyperscriptShorthands;
    } = {},
) {
    return createSlateHyperscript({
        creators: {
            'h-text': createText,
            ...options.creators,
        },
        elements: options.elements,
    });
}
