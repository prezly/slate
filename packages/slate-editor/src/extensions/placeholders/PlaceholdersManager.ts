import type { ProgressPromise } from '@prezly/progress-promise';
import type { AttachmentNode, ImageNode } from '@prezly/slate-types';
import { noop } from 'lodash-es';
import { useEffect, useState } from 'react';

import type { PlaceholderNode } from './PlaceholderNode';

type Type = PlaceholderNode.Type;
type Uuid = PlaceholderNode['uuid'];

interface Data {
    [PlaceholderNode.Type.ATTACHMENT]: {
        file: AttachmentNode['file'];
        caption: string;
    };
    [PlaceholderNode.Type.IMAGE]: {
        file: ImageNode['file'];
        caption: string;
    };
}

type Identifier<T extends Type> = { type: T; uuid: Uuid };

type Callbacks<T extends Type> = {
    onTrigger?: () => void;
    onLoading: (loading: boolean) => void;
    onResolve: (data: Data[T]) => void;
    onReject: () => void;
    onProgress: (progress: number) => void;
};
type Follower<T extends Type> = Identifier<T> & Callbacks<T>;
type Unfollow = () => void;

interface State {
    followers: Array<Follower<Type>>;
    triggers: Identifier<Type>[];
}

const state: State = {
    followers: [],
    triggers: [],
};

export const PlaceholdersManager = {
    trigger<T extends Type>({ type, uuid }: Identifier<T>): void {
        state.triggers = [...state.triggers, { type, uuid }];

        notify(type, uuid, (follower) => {
            trigger(follower);
        });
    },

    register<T extends Type>(
        type: T,
        uuid: Uuid,
        promise: ProgressPromise<Data[T], unknown>,
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
        const follower: Follower<T> = {
            type,
            uuid,
            onTrigger: callbacks.onTrigger,
            onLoading: callbacks.onLoading ?? noop,
            onResolve: callbacks.onResolve ?? noop,
            onReject: callbacks.onReject ?? noop,
            onProgress: callbacks.onProgress ?? noop,
        };

        state.followers = [...state.followers, follower as Follower<Type>];

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
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        return PlaceholdersManager.follow(type, uuid, {
            onTrigger,
            onLoading: setLoading,
            onResolve,
            onReject,
            onProgress,
        });
    }, [onTrigger, onProgress, onReject, onResolve]);

    return { isLoading };
}

function notify<T extends Type>(type: T, uuid: Uuid, callback: (follower: Follower<T>) => void) {
    state.followers.forEach((follower) => {
        if (follower.type === type && follower.uuid === uuid) {
            callback(follower as Follower<T>);
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
