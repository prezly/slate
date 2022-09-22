import type { ProgressPromise } from '@prezly/progress-promise';
import type { AttachmentNode } from '@prezly/slate-types';
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
}

type Identifier<T extends Type> = { type: T; uuid: Uuid };

type Callbacks<T extends Type> = {
    onLoading: (loading: boolean) => void;
    onResolve: (data: Data[T]) => void;
    onReject: () => void;
    onProgress: (progress: number) => void;
};
type Follower<T extends Type> = Identifier<T> & Callbacks<T>;
type Unfollow = () => void;

interface State {
    followers: Array<Follower<Type>>;
}

const state: State = {
    followers: [],
};

export const PlaceholdersManager = {
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
            onLoading: callbacks.onLoading ?? noop,
            onResolve: callbacks.onResolve ?? noop,
            onReject: callbacks.onReject ?? noop,
            onProgress: callbacks.onProgress ?? noop,
        };

        state.followers = [...state.followers, follower];

        return () => {
            state.followers = state.followers.filter((f) => f !== follower);
        };
    },
};

export function usePlaceholderManager<T extends Type>(
    type: T,
    uuid: PlaceholderNode['uuid'],
    callbacks: Partial<Pick<Callbacks<T>, 'onResolve' | 'onReject' | 'onProgress'>>,
) {
    const { onResolve, onReject, onProgress } = callbacks;
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        return PlaceholdersManager.follow(type, uuid, {
            onLoading: setLoading,
            onResolve,
            onReject,
            onProgress,
        });
    }, [onProgress, onReject, onResolve]);

    return { isLoading };
}

function notify<T extends Type>(type: T, uuid: Uuid, callback: (follower: Follower<T>) => void) {
    state.followers.forEach((follower) => {
        if (follower.type === type && follower.uuid === uuid) {
            callback(follower as Follower<T>);
        }
    });
}
