import type { Extension } from '@prezly/slate-commons';
import { AUTOFORMAT_EXTENSION_ID } from './constants';
import { withAutoformat } from './withAutoformat';
import type { AutoformatParameters } from './types';

export const AutoformatExtension = (params: AutoformatParameters): Extension => ({
    id: AUTOFORMAT_EXTENSION_ID,
    withOverrides: (editor) => withAutoformat(editor, params.rules),
});
