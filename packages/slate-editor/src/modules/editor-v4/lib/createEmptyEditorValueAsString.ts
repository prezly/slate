import { createEmptyValue } from '@prezly/slate-commons';

import serialize from './serialize';

const createEmptyEditorValueAsString = (): string => serialize(createEmptyValue());

export default createEmptyEditorValueAsString;
