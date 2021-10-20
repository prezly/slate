import { EditorCommands } from '@prezly/slate-commons';

import { ElementType, LinkCandidateElementType } from '../types';

const isLinkCandidateElement = (node: unknown): node is LinkCandidateElementType =>
    EditorCommands.isElementWithType(node) && node.type === ElementType.LINK_CANDIDATE;

export default isLinkCandidateElement;
