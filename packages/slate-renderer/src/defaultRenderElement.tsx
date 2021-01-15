import { ElementNode } from '@prezly/slate-types';
import { ReactNode } from 'react';

const defaultRenderElement = (element: ElementNode): ReactNode => {
    throw new Error(`Renderer not implemented for "${element.type}"`);
};

export default defaultRenderElement;
