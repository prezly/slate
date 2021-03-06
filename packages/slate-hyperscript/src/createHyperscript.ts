import {
    createHyperscript as createSlateHyperscript,
    HyperscriptCreators,
    HyperscriptShorthands,
} from './slate-hyperscript';
import { createText } from './slate-hyperscript/creators';

const createHyperscript = (
    options: {
        creators?: HyperscriptCreators;
        elements?: HyperscriptShorthands;
    } = {},
) =>
    createSlateHyperscript({
        creators: {
            'h-text': createText,
            ...options.creators,
        },
        elements: options.elements,
    });

export default createHyperscript;
