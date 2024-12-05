import { useEditorRef } from '@udecode/plate-common/react';
import React from 'react';
import { useSelected } from 'slate-react';

import { PlaceholderSocialPost } from '#icons';
import { URL_WITH_OPTIONAL_PROTOCOL_REGEXP, useFunction } from '#lib';

import type { EmbedNode } from '#extensions/embed';
import { EventsEditor } from '#modules/events';

import {
    type Props as BaseProps,
    InputPlaceholderElement,
} from '../components/InputPlaceholderElement';
import { withLoadingDots } from '../components/LoadingDots';
import { handleOembed } from '../lib';
import { PlaceholderNode } from '../PlaceholderNode';
import { PlaceholdersManager, usePlaceholderManagement } from '../PlaceholdersManager';
import type { FetchOEmbedFn } from '../types';

interface Props
    extends Omit<
        BaseProps,
        | 'icon'
        | 'title'
        | 'description'
        | 'onDrop'
        | 'inputTitle'
        | 'inputDescription'
        | 'inputPattern'
        | 'inputPlaceholder'
        | 'inputType'
        | 'inputAction'
        | 'onSubmit'
    > {
    element: PlaceholderNode<PlaceholderNode.Type.SOCIAL_POST>;
    fetchOembed: FetchOEmbedFn;
    withImagePlaceholders?: boolean;
    withVideoPlaceholders?: boolean;
    withWebBookmarkPlaceholders?: boolean;
}

export function SocialPostPlaceholderElement({
    children,
    element,
    fetchOembed,
    format = 'card-lg',
    withImagePlaceholders = false,
    withVideoPlaceholders = false,
    withWebBookmarkPlaceholders = false,
    ...props
}: Props) {
    const editor = useEditorRef();
    const isSelected = useSelected();

    const handleTrigger = useFunction(() => {
        PlaceholdersManager.activate(element);
    });

    const handleSubmit = useFunction(async (url: string) => {
        EventsEditor.dispatchEvent(editor, 'embed-placeholder-submitted', { url });

        const loading = fetchOembed(url).then(
            (oembed) => ({ oembed, url }),
            () => ({ url }), // `oembed` is undefined if an error occurred
        );

        PlaceholdersManager.register(element.type, element.uuid, loading);
        PlaceholdersManager.deactivateAll();
    });

    const handleData = useFunction(
        (data: { url: EmbedNode['url']; oembed?: EmbedNode['oembed'] }) => {
            const { url, oembed } = data;
            if (!oembed) {
                EventsEditor.dispatchEvent(editor, 'notification', {
                    children: 'Provided URL does not exist or is not supported.',
                    type: 'error',
                });
                return;
            }
            handleOembed(
                editor,
                element,
                { url, oembed },
                {
                    routeImages: withImagePlaceholders,
                    routeVideos: withVideoPlaceholders,
                    routeWebBookmarks: withWebBookmarkPlaceholders,
                    select: isSelected,
                },
            );
        },
    );

    usePlaceholderManagement(element.type, element.uuid, {
        onTrigger: handleTrigger,
        onResolve: handleData,
    });

    function render(
        override: Partial<
            Pick<
                BaseProps,
                | 'inputTitle'
                | 'inputAction'
                | 'inputDescription'
                | 'inputPlaceholder'
                | 'title'
                | 'description'
            >
        > = {},
    ) {
        const {
            inputTitle = 'Social media post',
            inputDescription = 'Paste a social media link and hit Enter',
            inputPlaceholder = 'https://twitter.com/tweet',
            inputAction = 'Add link',
            title = Title,
            description = Description,
        } = override;

        return (
            <InputPlaceholderElement
                {...props}
                element={element}
                // Core
                format={format}
                icon={PlaceholderSocialPost}
                title={title}
                description={description}
                // Input
                inputTitle={inputTitle}
                inputDescription={inputDescription}
                inputPattern={URL_WITH_OPTIONAL_PROTOCOL_REGEXP.source}
                inputPlaceholder={inputPlaceholder}
                inputAction={inputAction}
                onSubmit={handleSubmit}
            >
                {children}
            </InputPlaceholderElement>
        );
    }

    if (element.provider === PlaceholderNode.Provider.INSTAGRAM) {
        return render({
            inputTitle: 'Instagram post',
            inputDescription: 'Paste a social media link and hit Enter',
            inputPlaceholder: 'https://www.instagram.com/post/',
            inputAction: 'Add link',
            title: (props) => <Title {...props} text="Click to embed an Instagram post" />,
            description: (props) => <Description {...props} text="Add using a social media link" />,
        });
    }

    if (element.provider === PlaceholderNode.Provider.X) {
        return render({
            inputTitle: 'X post',
            inputDescription: 'Paste a social media link and hit Enter',
            inputPlaceholder: 'https://www.twitter.com/post/',
            inputAction: 'Add link',
            title: (props) => <Title {...props} text="Click to embed an X post" />,
            description: (props) => <Description {...props} text="Add using a social media link" />,
        });
    }

    if (element.provider === PlaceholderNode.Provider.FACEBOOK) {
        return render({
            inputTitle: 'Facebook post',
            inputDescription: 'Paste a social media link and hit Enter',
            inputPlaceholder: 'https://www.facebook.com/user/post/',
            inputAction: 'Add link',
            title: (props) => <Title {...props} text="Click to embed a Facebook post" />,
            description: (props) => <Description {...props} text="Add using a social media link" />,
        });
    }

    if (element.provider === PlaceholderNode.Provider.PINTEREST) {
        return render({
            inputTitle: 'Pinterest post',
            inputDescription: 'Paste a social media link and hit Enter',
            inputPlaceholder: 'https://pin.it/post',
            inputAction: 'Add link',
            title: (props) => <Title {...props} text="Click to embed a Pinterest post" />,
            description: (props) => <Description {...props} text="Add using a social media link" />,
        });
    }

    return render();
}

function Title(props: { isLoading: boolean; text?: string }) {
    const { isLoading, text = 'Click to embed a social media post' } = props;
    if (isLoading) {
        return <>{withLoadingDots('Embedding social media post')}</>;
    }
    return <>{text}</>;
}

function Description(props: { isLoading: boolean; text?: string }) {
    const { text = 'Add a tweet, Facebook or Instagram post in your story', isLoading } = props;
    if (isLoading) {
        return null;
    }
    return <>{text}</>;
}
