import type { Editor } from 'slate';
import type { RenderElementProps } from 'slate-react';

/**
 * To customize the rendering of each element components.
 * Element properties are for contiguous, semantic elements in the document.
 * Return undefined in case the criteria for rendering isn't met
 */
export type RenderElement = (props: RenderElementProps, editor: Editor) => JSX.Element | undefined;
