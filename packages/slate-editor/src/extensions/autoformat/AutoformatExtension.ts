import { useRegisterExtension } from '@prezly/slate-commons';

import type { AutoformatParameters } from './types';
import { withAutoformat } from './withAutoformat';

export const EXTENSION_ID = 'AutoformatExtension';

export function AutoformatExtension(params: AutoformatParameters) {
    return useRegisterExtension({
        id: EXTENSION_ID,
        withOverrides: (editor) => withAutoformat(editor, params.rules),
    });
}
