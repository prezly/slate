import type { ProgressPromise } from '@prezly/progress-promise';
import type { OEmbedInfo } from '@prezly/sdk';
import type {
    AttachmentNode,
    ContactNode,
    CoverageNode,
    GalleryNode,
    ImageNode,
    StoryBookmarkNode,
    StoryEmbedNode,
} from '@prezly/slate-types';
import { noop } from '@technically/lodash';
import { useEffect, useState } from 'react';

import { PlaceholderNode } from './PlaceholderNode';

const NOTIFICATION_TTL = 10000;

const Type = PlaceholderNode.Type;
type Type = PlaceholderNode.Type;
type Uuid = PlaceholderNode['uuid'];

interface Data {
    [Type.ATTACHMENT]: {
        file: AttachmentNode['file'];
        caption: string;
        trigger: 'placeholder' | 'paste';
    };
    [Type.CONTACT]: {
        contact: ContactNode['contact'];
    };
    [Type.COVERAGE]: {
        coverage: CoverageNode['coverage'];
    };
    [Type.EMBED]: {
        url: string;
        oembed?: OEmbedInfo; // `oembed` is undefined if an error occurred
        fallback?: 'link'; // fallback to a link, if getting oEmbed info for the given URL is not possible
    };
    [Type.GALLERY]: {
        gallery: GalleryNode;
        operation: 'add' | 'edit';
    };
    [Type.IMAGE]: {
        image: ImageNode;
        operation: 'add' | 'edit';
        trigger: 'placeholder' | 'paste' | 'paste-html';
    };
    [Type.MEDIA]: {
        media: {
            type: 'image';
            file: ImageNode['file'];
            caption: string;
        };
    };
    [Type.SOCIAL_POST]: {
        url: string;
        oembed?: OEmbedInfo; // `oembed` is undefined if an error occurred
    };
    [Type.STORY_BOOKMARK]: {
        node: StoryBookmarkNode;
    };
    [Type.STORY_EMBED]: {
        node: StoryEmbedNode;
    };
    [Type.VIDEO]: {
        url: string;
        oembed?: OEmbedInfo; // `oembed` is undefined if an error occurred
        fallback?: 'link'; // fallback to a link, if getting oEmbed info for the given URL is not possible
    };
    [Type.WEB_BOOKMARK]: {
        url: string;
        oembed?: OEmbedInfo; // `oembed` is undefined if an error occurred
        fallback?: 'link'; // fallback to a link, if getting oEmbed info for the given URL is not possible
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

type Notification<T extends Type> = Identifier<T> & {
    callback: (follower: Follower<T>) => void;
};

interface State {
    active: Identifier<Type> | undefined;
    followers: Array<Follower<Type>>;
    notifications: Notification<Type>[];
    triggers: Identifier<Type>[];
}

const state: State = {
    active: undefined,
    followers: [],
    notifications: [],
    triggers: [],
};

export const PlaceholdersManager = {
    activate<T extends Type>({ type, uuid }: Identifier<T>): void {
        state.active = { type, uuid };
        state.followers.forEach((follower) => {
            follower.onActivate(is(follower, type, uuid));
        });
    },

    deactivate<T extends Type>({ type, uuid }: Identifier<T>): void {
        if (state.active && is(state.active, type, uuid)) {
            state.active = undefined;
            notify(type, uuid, ({ onActivate }) => onActivate(false), 'wipe');
        }
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
        consumeNotifications(follower);

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

type NotificationsMemoryAction = 'wipe' | 'add' | 'replace';

function notify<T extends Type>(
    type: T,
    uuid: Uuid,
    callback: (follower: Follower<T>) => void,
    memory: NotificationsMemoryAction = 'add',
) {
    const notification = { type, uuid, callback } as any as Notification<Type>;

    if (memory === 'add') {
        state.notifications = [...state.notifications, notification];
    } else if (memory === 'replace') {
        state.notifications = [notification];
    } else if (memory === 'wipe') {
        state.notifications = [];
    }

    setTimeout(() => {
        state.notifications = state.notifications.filter((n) => n !== notification);
    }, NOTIFICATION_TTL);

    state.followers.forEach((follower) => {
        if (is(follower, type, uuid)) {
            callback(follower as any as Follower<T>);
        }
    });
}

function consumeNotifications<T extends Type>(follower: Follower<T>) {
    state.notifications.forEach(({ type, uuid, callback }) => {
        if (is(follower, type, uuid)) {
            (callback as any as Notification<T>['callback'])(follower);
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
