import type { ProgressPromise } from '@prezly/progress-promise';
import type { OEmbedInfo } from '@prezly/sdk';
import type { AttachmentNode, GalleryNode, ImageNode } from '@prezly/slate-types';
import { noop } from 'lodash-es';
import { useEffect, useState } from 'react';

import { PlaceholderNode } from './PlaceholderNode';

const Type = PlaceholderNode.Type;
type Type = PlaceholderNode.Type;
type Uuid = PlaceholderNode['uuid'];

interface Data {
    [Type.ATTACHMENT]: {
        file: AttachmentNode['file'];
        caption: string;
    };
    [Type.EMBED]: {
        url: string;
        oembed?: OEmbedInfo; // `oembed` is undefined if an error occurred
    };
    [Type.GALLERY]: {
        images: GalleryNode['images'];
    };
    [Type.IMAGE]: {
        file: ImageNode['file'];
        caption: string;
    };
    [Type.SOCIAL_POST]: {
        url: string;
        oembed?: OEmbedInfo; // `oembed` is undefined if an error occurred
    };
    [Type.VIDEO]: {
        url: string;
        oembed?: OEmbedInfo; // `oembed` is undefined if an error occurred
    };

    [Type.WEB_BOOKMARK]: {
        url: string;
        oembed?: OEmbedInfo; // `oembed` is undefined if an error occurred
    };
}

type Identifier<T extends Type> = { type: T; uuid: Uuid };

type Callbacks<T extends Type> = {
    onActivate: (active: boolean) => void;
    onTrigger?: () => void;
    onLoading: (loading: boolean) => void;
    onResolve: (data: Data[T]) => void;
    onReject: () => void;
    onProgress: (progress: number) => void;
};
type Follower<T extends Type> = Identifier<T> & Callbacks<T>;
type Unfollow = () => void;

interface State {
    active: Identifier<Type> | undefined;
    followers: Array<Follower<Type>>;
    triggers: Identifier<Type>[];
}

const state: State = {
    active: undefined,
    followers: [],
    triggers: [],
};

export const PlaceholdersManager = {
    activate<T extends Type>({ type, uuid }: Identifier<T>): void {
        state.active = { type, uuid };
        state.followers.forEach((follower) => {
            follower.onActivate(is(follower, type, uuid));
        });
    },

    deactivateAll(): void {
        state.active = undefined;
        state.followers.forEach((follower) => {
            follower.onActivate(false);
        });
    },

    trigger<T extends Type>({ type, uuid }: Identifier<T>): void {
        state.triggers = [...state.triggers, { type, uuid }];

        notify(type, uuid, (follower) => {
            trigger(follower);
        });
    },

    register<T extends Type>(
        type: T,
        uuid: Uuid,
        promise: Promise<Data[T]> | ProgressPromise<Data[T], unknown>,
    ): void {
        notify(type, uuid, ({ onLoading }) => onLoading(true));

        promise.then(
            (data) => {
                notify(type, uuid, ({ onResolve }) => onResolve(data));
                notify(type, uuid, ({ onLoading }) => onLoading(false));
            },
            () => {
                notify(type, uuid, ({ onReject }) => onReject());
                notify(type, uuid, ({ onLoading }) => onLoading(false));
            },
            (progress) => {
                notify(type, uuid, ({ onProgress }) => onProgress(progress));
            },
        );
    },
    follow<T extends Type>(type: T, uuid: Uuid, callbacks: Partial<Callbacks<T>>): Unfollow {
        const follower: Follower<Type> = {
            type,
            uuid,
            onActivate: callbacks.onActivate ?? noop,
            onTrigger: callbacks.onTrigger,
            onLoading: callbacks.onLoading ?? noop,
            onResolve: callbacks.onResolve ?? noop,
            onReject: callbacks.onReject ?? noop,
            onProgress: callbacks.onProgress ?? noop,
        };

        state.followers = [...state.followers, follower];

        trigger(follower);

        return () => {
            state.followers = state.followers.filter((f) => f !== follower);
        };
    },
};

export function usePlaceholderManagement<T extends Type>(
    type: T,
    uuid: Uuid,
    callbacks: Partial<Pick<Callbacks<T>, 'onTrigger' | 'onResolve' | 'onReject' | 'onProgress'>>,
) {
    const { onTrigger, onResolve, onReject, onProgress } = callbacks;
    const initiallyActive =
        state.active && state.active.type === type && state.active.uuid === uuid;
    const [isActive, setActive] = useState(initiallyActive);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        return PlaceholdersManager.follow(type, uuid, {
            onActivate: setActive,
            onLoading: setLoading,
            onTrigger,
            onResolve,
            onReject,
            onProgress,
        });
    }, [onTrigger, onProgress, onReject, onResolve]);

    return { isActive, isLoading };
}

function is<T extends Type>(follower: Identifier<Type>, type: T, uuid?: Uuid): boolean {
    return follower.type === type && follower.uuid === uuid;
}

function notify<T extends Type>(type: T, uuid: Uuid, callback: (follower: Follower<T>) => void) {
    state.followers.forEach((follower) => {
        if (is(follower, type, uuid)) {
            callback(follower as any as Follower<T>);
        }
    });
}

function trigger<T extends Type>({ type, uuid, onTrigger }: Follower<T>) {
    if (!onTrigger) return;

    const shouldTrigger = state.triggers.some(
        (trigger) => trigger.uuid === uuid && trigger.type === type,
    );

    if (shouldTrigger) {
        onTrigger();
        // remove pending trigger
        state.triggers = state.triggers.filter(
            (trigger) => !(trigger.uuid === uuid && trigger.type === type),
        );
    }
}
