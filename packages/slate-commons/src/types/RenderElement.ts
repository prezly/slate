import { RenderElementProps } from 'slate-react';

/**
 * To customize the rendering of each element components.
 * Element properties are for contiguous, semantic elements in the document.
 * Return undefined in case the criteria for rendering isn't met
 */
type RenderElement = (props: RenderElementProps) => JSX.Element | undefined;

// eslint-disable-next-line no-undef
export default RenderElement;
