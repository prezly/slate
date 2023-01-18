import type { ContactInfo } from '@prezly/slate-types';
import type { ReactNode } from 'react';

export interface InlineContactsExtensionParameters {
    renderForm: (formProps: FormProps) => ReactNode;
}

export interface FormProps {
    onClose: () => void;
    onSubmit: (contactInfo: ContactInfo) => void;
}
