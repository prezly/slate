import type { DocumentNode } from '@prezly/slate-types';
import type { ReactNode } from 'react';

export interface SnippetsExtensionConfiguration {
    renderInput: (args: { onCreate: (documentNode: DocumentNode) => void }) => ReactNode;
}
