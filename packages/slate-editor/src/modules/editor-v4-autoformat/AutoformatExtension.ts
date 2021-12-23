import type { Extension } from '@prezly/slate-commons';
import { AUTOFORMAT_EXTENSION_ID } from './constants';
import type { AutoformatParameters } from './types';
import { withAutoformat } from './withAutoformat';

export const AutoformatExtension = (params: AutoformatParameters): Extension => ({
    id: AUTOFORMAT_EXTENSION_ID,
    withOverrides: (editor) => withAutoformat(editor, params.rules),
});
