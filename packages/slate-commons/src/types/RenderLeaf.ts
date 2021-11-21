import type { RenderLeafProps } from 'slate-react';

/**
 * To customize the rendering of each leaf.
 * When text-level formatting is rendered, the characters are grouped into
 * "leaves" of text that each contain the same formatting applied to them.
 * Text properties are for non-contiguous, character-level formatting.
 * RenderLeaf always returns a JSX element (even if unmodified) to support multiple marks on a node.
 */
type RenderLeaf = (props: RenderLeafProps) => JSX.Element;

// eslint-disable-next-line no-undef
export default RenderLeaf;
