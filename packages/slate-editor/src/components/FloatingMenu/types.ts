import type { ReactNode } from 'react';

export interface Option<Value extends string> {
    hidden?: boolean;
    label: string;
    render?: (option: Option<Value>) => ReactNode;
    value: Value;
}
