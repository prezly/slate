import type { Extension } from '@prezly/slate-commons';

import type { AutoformatParameters } from './types';
import { withAutoformat } from './withAutoformat';

export const EXTENSION_ID = 'AutoformatExtension';

export function AutoformatExtension(params: AutoformatParameters): Extension {
    return {
        id: EXTENSION_ID,
        withOverrides: (editor) => withAutoformat(editor, params.rules),
    };
}
