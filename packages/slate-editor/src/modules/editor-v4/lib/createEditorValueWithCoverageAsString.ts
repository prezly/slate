import { createEmptyValue } from '@prezly/slate-commons';

import { createCoverage } from 'modules/editor-v4-coverage';
import { Coverage } from 'types';

import serialize from './serialize';

const createEditorValueWithCoverageAsString = (coverageIds: Coverage['id'][]): string => {
    const emptyValue = createEmptyValue();
    const coverageNodes = coverageIds.map((id) => createCoverage(id));
    const value = [...emptyValue, ...coverageNodes];
    return serialize(value);
};

export default createEditorValueWithCoverageAsString;
