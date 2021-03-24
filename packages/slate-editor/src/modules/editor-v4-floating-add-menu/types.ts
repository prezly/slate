import { ReactNode } from 'react';
import { Editor } from 'slate';

export interface Option {
    beta?: boolean;
    icon: ReactNode;
    onClick: (editor: Editor) => void;
    text: string;
}

export interface FloatingAddMenuExtensionParameters {
    tooltip?: {
        placement: 'top' | 'right' | 'bottom' | 'left';
        title: string;
    };
}

export interface FloatingAddMenuParameters extends FloatingAddMenuExtensionParameters {
    options: Option[];
}
