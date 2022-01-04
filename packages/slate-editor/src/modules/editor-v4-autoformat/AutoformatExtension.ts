import type { Extension } from '@prezly/slate-commons';

import { AUTOFORMAT_EXTENSION_ID } from './constants';
import type { AutoformatParameters } from './types';
import { withAutoformat } from './withAutoformat';

export function AutoformatExtension(params: AutoformatParameters): Extension {
    return {
        id: AUTOFORMAT_EXTENSION_ID,
        withOverrides: (editor) => withAutoformat(editor, params.rules),
    };
}
