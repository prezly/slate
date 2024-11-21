import type { ElementNode } from '@prezly/slate-types';
import { isElementNode } from '@prezly/slate-types';
import type { TNode } from '@udecode/plate-common';
import type { Node } from 'slate';

type Uuid = string;

export interface PlaceholderNode<T extends PlaceholderNode.Type = PlaceholderNode.Type>
    extends ElementNode {
    type: T;
    uuid: Uuid;
    provider?: `${PlaceholderNode.Provider}`;
}

export namespace PlaceholderNode {
    export enum Provider {
        YOUTUBE = 'youtube',
        TIKTOK = 'tiktok',
        INSTAGRAM = 'instagram',
        DROPBOX = 'dropbox',
        X = 'x',
        VIMEO = 'vimeo',
        SOUNDCLOUD = 'soundcloud',
        GIPHY = 'giphy',
        SPOTIFY = 'spotify',
        FACEBOOK = 'facebook',
        PINTEREST = 'pinterest',
        GOOGLE_MAPS = 'google_maps',
        GOOGLE_SHEETS = 'google_sheets',
        GOOGLE_DOCS = 'google_docs',
        CALENDLY = 'calendly',
        EVENTBRITE = 'eventbrite',
        TYPEFORM = 'typeform',
        TALLY = 'tally',
        MICROSOFT_TEAMS = 'microsoft_teams',
        PODCAST = 'podcast',
        AUDIO = 'audio',
    }

    export enum Type {
        ATTACHMENT = 'placeholder:attachment',
        CONTACT = 'placeholder:contact',
        COVERAGE = 'placeholder:coverage',
        EMBED = 'placeholder:embed',
        GALLERY = 'placeholder:gallery',
        GALLERY_BOOKMARK = 'placeholder:gallery-bookmark',
        IMAGE = 'placeholder:image',
        /**
         * Media placeholder allows to insert one of multiple types of media (image, video, and maybe embed?)
         */
        MEDIA = 'placeholder:media',
        SOCIAL_POST = 'placeholder:social-post',
        STORY_BOOKMARK = 'placeholder:story-bookmark',
        STORY_EMBED = 'placeholder:story-embed',
        VIDEO = 'placeholder:video',
        WEB_BOOKMARK = 'placeholder:bookmark',
    }

    export function isPlaceholderNode(node: Node | TNode): node is PlaceholderNode;

    export function isPlaceholderNode<T extends Type>(
        node: Node | TNode,
        type: T,
    ): node is PlaceholderNode<T>;

    export function isPlaceholderNode<T extends Type>(
        node: Node | TNode,
        types: T[],
    ): node is PlaceholderNode<T>;

    export function isPlaceholderNode<T extends Type>(
        node: Node | TNode,
        type: `${T}`,
    ): node is PlaceholderNode<T>;

    export function isPlaceholderNode(node: Node | TNode, type?: string | string[]): boolean {
        if (typeof type === 'string') {
            return isElementNode(node, type);
        }
        if (type && Array.isArray(type)) {
            return isElementNode(node, type);
        }
        return isElementNode(node, Object.values(Type));
    }

    export function isSameAs<T extends PlaceholderNode>(placeholder: T, node: Node | TNode): node is T;
    export function isSameAs<T extends PlaceholderNode>(placeholder: T): (node: Node | TNode) => node is T;
    export function isSameAs<T extends PlaceholderNode>(
        placeholder: T,
        node?: Node | TNode,
    ): boolean | ((node: Node | TNode) => boolean) {
        if (!node) {
            return (node: Node | TNode): node is T => {
                return (
                    PlaceholderNode.isPlaceholderNode(node, placeholder.type) &&
                    node.uuid === placeholder.uuid
                );
            };
        }

        return (
            PlaceholderNode.isPlaceholderNode(node, placeholder.type) &&
            node.uuid === placeholder.uuid
        );
    }
}
