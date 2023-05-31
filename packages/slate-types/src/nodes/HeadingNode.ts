import type { ElementNode } from './ElementNode';
import { isElementNode } from './ElementNode';
import type { Alignable } from './interfaces';

export const HEADING_1_NODE_TYPE = 'heading-one';
export const HEADING_2_NODE_TYPE = 'heading-two';

type HeadingType = typeof HEADING_1_NODE_TYPE | typeof HEADING_2_NODE_TYPE;

export enum HeadingRole {
    TITLE = 'title',
    SUBTITLE = 'subtitle',
}

export interface HeadingNode<T extends HeadingType = HeadingType> extends ElementNode, Alignable {
    type: T;
    role?: HeadingRole;
}

export function isHeadingNode(value: any): value is HeadingNode;
export function isHeadingNode<T extends HeadingType>(value: any, type: T): value is HeadingNode<T>;
export function isHeadingNode(value: any, type?: string): boolean {
    return (
        isElementNode<HeadingNode>(value, [HEADING_1_NODE_TYPE, HEADING_2_NODE_TYPE]) &&
        (type === undefined || value.type === type)
    );
}

export function isTitleHeadingNode(value: any): value is HeadingNode;
export function isTitleHeadingNode(value: any): boolean {
    return isHeadingNode(value) && value.role === HeadingRole.TITLE;
}

export function isSubtitleHeadingNode(value: any): value is HeadingNode;
export function isSubtitleHeadingNode(value: any): boolean {
    return isHeadingNode(value) && value.role === HeadingRole.SUBTITLE;
}
