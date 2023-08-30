import React from 'react';
import { useSlateStatic } from 'slate-react';

import { PlaceholderEmbed } from '#icons';
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
    element: PlaceholderNode<PlaceholderNode.Type.EMBED>;
    fetchOembed: FetchOEmbedFn;
    withImagePlaceholders?: boolean;
    withVideoPlaceholders?: boolean;
    withWebBookmarkPlaceholders?: boolean;
}

export function EmbedPlaceholderElement({
    children,
    element,
    fetchOembed,
    format = 'card-lg',
    withImagePlaceholders = false,
    withVideoPlaceholders = false,
    withWebBookmarkPlaceholders = false,
    ...props
}: Props) {
    const editor = useSlateStatic();

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
        async (data: { url: EmbedNode['url']; oembed?: EmbedNode['oembed'] }) => {
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
            inputAction = 'Add embed',
            inputDescription = 'Insert an embed URL and hit Enter',
            inputPlaceholder = 'media.giphy.com/GIF',
            inputTitle = 'Embed',
            title = Title,
            description = Description,
        } = override;

        return (
            <InputPlaceholderElement
                {...props}
                element={element}
                // Core
                format={format}
                icon={PlaceholderEmbed}
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

    if (element.provider === PlaceholderNode.Provider.DROPBOX) {
        return render({
            inputTitle: 'Dropbox embed',
            inputDescription: 'Paste a link and hit Enter',
            inputPlaceholder: 'https://www.dropbox.com/s/file/',
            inputAction: 'Add embed',
            title: (props) => <Title {...props} text="Click to insert a Dropbox embed" />,
            description: (props) => <Description {...props} text="Add using a share link" />,
        });
    }

    if (element.provider === PlaceholderNode.Provider.SOUNDCLOUD) {
        return render({
            inputTitle: 'SoundCloud embed',
            inputDescription: 'Paste a link and hit Enter',
            inputPlaceholder: 'https://www.soundcloud.com/artist/music',
            inputAction: 'Add embed',
            title: (props) => <Title {...props} text="Click to insert a SoundCloud embed" />,
            description: (props) => <Description {...props} text="Add using a share link" />,
        });
    }

    if (element.provider === PlaceholderNode.Provider.GIPHY) {
        return render({
            inputTitle: 'Giphy embed',
            inputDescription: 'Paste a link and hit Enter',
            inputPlaceholder: 'https://www.giphy.com/gif',
            inputAction: 'Add embed',
            title: (props) => <Title {...props} text="Click to insert a Giphy embed" />,
            description: (props) => <Description {...props} text="Add using a share link" />,
        });
    }

    if (element.provider === PlaceholderNode.Provider.SPOTIFY) {
        return render({
            inputTitle: 'Spotify embed',
            inputDescription: 'Paste a link and hit Enter',
            inputPlaceholder: 'https://open.spotify.com/',
            inputAction: 'Add embed',
            title: (props) => <Title {...props} text="Click to insert a Spotify embed" />,
            description: (props) => <Description {...props} text="Add using a share link" />,
        });
    }

    if (element.provider === PlaceholderNode.Provider.GOOGLE_MAPS) {
        return render({
            inputTitle: 'Google Maps embed',
            inputDescription: 'Paste a link and hit Enter',
            inputPlaceholder: 'https://goo.gl/maps/location',
            inputAction: 'Add embed',
            title: (props) => <Title {...props} text="Click to insert a Google Maps embed" />,
            description: (props) => <Description {...props} text="Add using a share link" />,
        });
    }

    if (element.provider === PlaceholderNode.Provider.GOOGLE_SHEETS) {
        return render({
            inputTitle: 'Google Sheets embed',
            inputDescription: 'Paste a link and hit Enter',
            inputPlaceholder: 'https://docs.google.com/spreadsheets/',
            inputAction: 'Add embed',
            title: (props) => <Title {...props} text="Click to insert a Google Sheets embed" />,
            description: (props) => <Description {...props} text="Add using a share link" />,
        });
    }

    if (element.provider === PlaceholderNode.Provider.GOOGLE_DOCS) {
        return render({
            inputTitle: 'Google Docs embed',
            inputDescription: 'Paste a link and hit Enter',
            inputPlaceholder: 'https://docs.google.com/document/',
            inputAction: 'Add embed',
            title: (props) => <Title {...props} text="Click to insert a Google Docs embed" />,
            description: (props) => <Description {...props} text="Add using a share link" />,
        });
    }

    if (element.provider === PlaceholderNode.Provider.CALENDLY) {
        return render({
            inputTitle: 'Calendly embed',
            inputDescription: 'Paste a link and hit Enter',
            inputPlaceholder: 'https://calendly.com/d/event',
            inputAction: 'Add embed',
            title: (props) => <Title {...props} text="Click to insert a Calendly embed" />,
            description: (props) => <Description {...props} text="Add using a share link" />,
        });
    }

    if (element.provider === PlaceholderNode.Provider.EVENTBRITE) {
        return render({
            inputTitle: 'Eventbrite embed',
            inputDescription: 'Paste a link and hit Enter',
            inputPlaceholder: 'https://www.eventbrite.com/e/event',
            inputAction: 'Add embed',
            title: (props) => <Title {...props} text="Click to insert an Eventbrite embed" />,
            description: (props) => <Description {...props} text="Add using a share link" />,
        });
    }

    if (element.provider === PlaceholderNode.Provider.TYPEFORM) {
        return render({
            inputTitle: 'Typeform embed',
            inputDescription: 'Paste a link and hit Enter',
            inputPlaceholder: 'https://www.typeform.com/to/form',
            inputAction: 'Add embed',
            title: (props) => <Title {...props} text="Click to insert a Typeform embed" />,
            description: (props) => <Description {...props} text="Add using a share link" />,
        });
    }

    if (element.provider === PlaceholderNode.Provider.TALLY) {
        return render({
            inputTitle: 'Tally form',
            inputDescription: 'Paste a link and hit Enter',
            inputPlaceholder: 'https://tally.so/form',
            inputAction: 'Add form',
            title: (props) => <Title {...props} text="Click to insert a Tally form" />,
            description: (props) => <Description {...props} text="Add using a share link" />,
        });
    }

    if (element.provider === PlaceholderNode.Provider.MICROSOFT_TEAMS) {
        return render({
            inputTitle: 'Microsoft Teams embed',
            inputDescription: 'Paste a link and hit Enter',
            inputPlaceholder: 'https://teams.microsoft.com/',
            inputAction: 'Add embed',
            title: (props) => <Title {...props} text="Click to insert a Microsoft Teams embed" />,
            description: (props) => <Description {...props} text="Add using a share link" />,
        });
    }

    if (element.provider === PlaceholderNode.Provider.PODCAST) {
        return render({
            inputTitle: 'Podcast',
            inputDescription: 'Paste a podcast link and hit Enter',
            inputPlaceholder: 'https://open.spotify.com/episode/podcast',
            inputAction: 'Add podcast',
            title: (props) => <Title {...props} text="Click to insert a podcast" />,
            description: (props) => <Description {...props} text="Add using a share link" />,
        });
    }

    if (element.provider === PlaceholderNode.Provider.AUDIO) {
        return render({
            inputTitle: 'Audio',
            inputDescription: 'Paste an audio link and hit Enter',
            inputPlaceholder: 'https://open.spotify.com/track/music',
            inputAction: 'Add audio',
            title: (props) => <Title {...props} text="Click to insert an audio" />,
            description: (props) => <Description {...props} text="Add using a share link" />,
        });
    }

    return render();
}

function Title(props: { isLoading: boolean; text?: string }) {
    const { isLoading, text = 'Click to insert an embed' } = props;
    if (isLoading) {
        return <>{withLoadingDots('Embedding content')}</>;
    }
    return <>{text}</>;
}

function Description(props: { isLoading: boolean; text?: string }) {
    const { isLoading, text = 'Add any web content like a GIF or Spotify song' } = props;
    if (isLoading) {
        return null;
    }
    return <>{text}</>;
}
