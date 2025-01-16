import type { SlateEditor } from '@udecode/plate-common';

import * as Icons from '#icons';

import type { Option } from '#extensions/floating-add-menu';
import { UploadcareEditor } from '#modules/uploadcare';

export enum MenuAction {
    ADD_ATTACHMENT = 'add_attachment',
    ADD_BUTTON_BLOCK = 'add_button_block',
    ADD_CALLOUT = 'add_callout',
    ADD_CONTACT = 'add_contact',
    ADD_COVERAGE = 'add_coverage',
    ADD_DIVIDER = 'add_divider',
    ADD_TABLE = 'add_table',
    ADD_EMBED = 'add_embed',
    ADD_PODCAST = 'add_podcast',
    ADD_AUDIO = 'add_audio',
    ADD_INSTAGRAM = 'add_instagram',
    ADD_X = 'add_x',
    ADD_FACEBOOK = 'add_facebook',
    ADD_VIMEO = 'add_vimeo',
    ADD_DROPBOX = 'add_dropbox',
    ADD_SOUNDCLOUD = 'add_soundcloud',
    ADD_SPOTIFY = 'add_spotify',
    ADD_GOOGLE_MAPS = 'add_google_maps',
    ADD_GOOGLE_SHEETS = 'add_google_sheets',
    ADD_GOOGLE_DOCS = 'add_google_docs',
    ADD_CALENDLY = 'add_calendly',
    ADD_EVENTBRITE = 'add_eventbrite',
    ADD_TYPEFORM = 'add_typeform',
    ADD_TALLY = 'add_tally',
    ADD_MICROSOFT_TEAMS = 'add_microsoft_teams',
    ADD_GIPHY = 'add_giphy',
    ADD_PINTEREST = 'add_pinterest',
    ADD_EMBED_SOCIAL = 'add_embed_social',
    ADD_GALLERY = 'add_gallery',
    ADD_GALLERY_BOOKMARK = 'add_gallery_bookmark',
    ADD_HEADING_1 = 'add_heading_1',
    ADD_HEADING_2 = 'add_heading_2',
    ADD_IMAGE = 'add_image',
    ADD_PARAGRAPH = 'add_paragraph',
    ADD_QUOTE = 'add_quote',
    ADD_VIDEO = 'add_video',
    ADD_YOUTUBE = 'add_youtube',
    ADD_TIKTOK = 'add_tiktok',
    ADD_WEB_BOOKMARK = 'add_web_bookmark',
    ADD_STORY_EMBED = 'add_story_embed',
    ADD_STORY_BOOKMARK = 'add_story_bookmark',
    ADD_SNIPPET = 'add_snippet',
}

enum Group {
    TEXT_N_LAYOUT = 'Text & Layout',
    MEDIA_CONTENT = 'Media Content',
    PREZLY_CONTENT = 'Prezly Content',
    SOCIAL_MEDIA = 'Social Media',
    VIDEOS = 'Videos',
    AUDIO_MUSIC_PODCASTS = 'Audio, Music and Podcasts',
    FILE_N_DOCUMENTS = 'Files & Documents',
    FORMS = 'Forms',
    OTHER = 'Other',
}

interface Params {
    withAttachments: boolean;
    withBlockquotes: boolean;
    withButtonBlocks: boolean;
    withCallouts: boolean;
    withCoverage: boolean;
    withDivider: boolean;
    withTables: boolean;
    withEmbeds: boolean;
    withEmbedSocial: boolean;
    withGalleries: boolean;
    withGalleryBookmarks: boolean;
    withHeadings: boolean;
    withImages: boolean;
    withParagraphs: boolean;
    withPressContacts: boolean;
    withStoryEmbeds: boolean;
    withStoryBookmarks: boolean;
    withVideos: boolean;
    withWebBookmarks: boolean;
    withSnippets: boolean;
    withSpecificProviderOptions?: boolean;
}

/**
 * Keeping track of suggestions ordering in one place.
 */
const Suggested: Partial<Record<MenuAction, number>> = {
    [MenuAction.ADD_IMAGE]: 1,
    [MenuAction.ADD_BUTTON_BLOCK]: 2,
    [MenuAction.ADD_CONTACT]: 3,
    [MenuAction.ADD_GALLERY]: 4,
    [MenuAction.ADD_DIVIDER]: 5,
    [MenuAction.ADD_CALLOUT]: 6,
    [MenuAction.ADD_ATTACHMENT]: 7,
    [MenuAction.ADD_SNIPPET]: 8,
};

export function generateFloatingAddMenuOptions(
    editor: SlateEditor,
    params: Params,
): Option<MenuAction>[] {
    const options = Array.from(generateOptions(editor, params));
    return options.map((option) => ({ ...option, suggested: Suggested[option.action] }));
}

function* generateOptions(
    editor: SlateEditor,
    {
        withAttachments,
        withBlockquotes,
        withButtonBlocks,
        withCallouts,
        withCoverage,
        withDivider,
        withTables,
        withEmbeds,
        withEmbedSocial,
        withGalleries,
        withGalleryBookmarks,
        withHeadings,
        withImages,
        withParagraphs,
        withPressContacts,
        withStoryEmbeds,
        withStoryBookmarks,
        withSnippets,
        withVideos,
        withWebBookmarks,
        withSpecificProviderOptions,
    }: Params,
): Generator<Omit<Option<MenuAction>, 'suggested'>> {
    if (withHeadings) {
        yield {
            icon: Icons.ComponentH1,
            action: MenuAction.ADD_HEADING_1,
            group: Group.TEXT_N_LAYOUT,
            text: 'Heading 1',
            keywords: ['title'],
            description: 'Big section heading',
        };
        yield {
            icon: Icons.ComponentH2,
            action: MenuAction.ADD_HEADING_2,
            group: Group.TEXT_N_LAYOUT,
            text: 'Heading 2',
            keywords: ['title', 'subtitle'],
            description: 'Medium section heading',
        };
    }

    if (withParagraphs) {
        yield {
            icon: Icons.ComponentText,
            action: MenuAction.ADD_PARAGRAPH,
            group: Group.TEXT_N_LAYOUT,
            text: 'Text',
            description: 'Start writing plain text',
        };
    }

    if (withBlockquotes) {
        yield {
            icon: Icons.ComponentQuote,
            action: MenuAction.ADD_QUOTE,
            group: Group.TEXT_N_LAYOUT,
            text: 'Quote',
            keywords: ['citation'],
            description: 'Highlight a text section',
        };
    }

    if (withCallouts) {
        yield {
            icon: Icons.ComponentCallout,
            action: MenuAction.ADD_CALLOUT,
            group: Group.TEXT_N_LAYOUT,
            text: 'Callout',
            keywords: ['highlight', 'alert', 'note', 'warning'],
            description: 'Make your text stand out',
            isNew: true,
        };
    }

    if (withDivider) {
        yield {
            icon: Icons.ComponentDivider,
            action: MenuAction.ADD_DIVIDER,
            group: Group.TEXT_N_LAYOUT,
            text: 'Divider',
            keywords: ['line', 'separator'],
            description: 'Divide blocks with a line',
        };
    }

    if (withButtonBlocks) {
        yield {
            action: MenuAction.ADD_BUTTON_BLOCK,
            icon: Icons.ComponentButton,
            group: Group.TEXT_N_LAYOUT,
            text: 'Button',
            description: 'Insert a link button',
            keywords: ['cta', 'call to action', 'calltoaction', 'link', 'anchor'],
        };
    }

    if (withTables) {
        yield {
            action: MenuAction.ADD_TABLE,
            icon: Icons.ComponentTable,
            group: Group.TEXT_N_LAYOUT,
            text: 'Table',
            description: 'Insert a table',
        };
    }

    if (withImages && UploadcareEditor.isUploadcareEditor(editor)) {
        yield {
            action: MenuAction.ADD_IMAGE,
            icon: Icons.ComponentImage,
            group: Group.MEDIA_CONTENT,
            text: 'Image',
            keywords: ['photo', 'picture', 'foto'],
            description: 'Place an image',
        };
    }

    if (withGalleries && UploadcareEditor.isUploadcareEditor(editor)) {
        yield {
            action: MenuAction.ADD_GALLERY,
            icon: Icons.ComponentGallery,
            group: Group.MEDIA_CONTENT,
            text: 'Gallery',
            description: 'Create an image composition',
        };
    }

    if (withGalleryBookmarks) {
        yield {
            action: MenuAction.ADD_GALLERY_BOOKMARK,
            icon: Icons.ComponentGallery,
            group: Group.MEDIA_CONTENT,
            text: 'Media gallery bookmark',
            description: 'Add a link to your media gallery',
        };
    }

    if (withVideos) {
        yield {
            action: MenuAction.ADD_VIDEO,
            icon: Icons.ComponentVideo,
            group: Group.MEDIA_CONTENT,
            text: 'Video',
            description: 'Embed video by URL or upload',
        };
    }

    if (withEmbedSocial) {
        yield {
            action: MenuAction.ADD_EMBED_SOCIAL,
            icon: Icons.ComponentEmbed,
            group: Group.MEDIA_CONTENT,
            text: 'Social post',
            description: 'Embed a social media link',
        };
    }

    if (withAttachments && UploadcareEditor.isUploadcareEditor(editor)) {
        yield {
            action: MenuAction.ADD_ATTACHMENT,
            icon: Icons.ComponentAttachment,
            group: Group.MEDIA_CONTENT,
            text: 'File attachment',
            description: 'Upload or link a file',
        };
    }

    if (withWebBookmarks) {
        yield {
            action: MenuAction.ADD_WEB_BOOKMARK,
            icon: Icons.ComponentWebBookmark,
            group: Group.MEDIA_CONTENT,
            text: 'Website bookmark',
            keywords: ['link'],
            description: 'Insert a visual website link',
        };
    }

    if (withEmbeds) {
        yield {
            action: MenuAction.ADD_PODCAST,
            icon: Icons.ComponentPodcast,
            group: Group.MEDIA_CONTENT,
            text: 'Podcast',
            keywords: ['audio', 'transistor', 'rumble', 'anchor', 'spotify', 'apple', 'google'],
            description: 'Insert a podcast link',
        };

        yield {
            action: MenuAction.ADD_AUDIO,
            icon: Icons.ComponentAudio,
            group: Group.MEDIA_CONTENT,
            keywords: ['mp3', 'music', 'song'],
            text: 'Audio',
            description: 'Insert audio link',
        };

        yield {
            action: MenuAction.ADD_EMBED,
            icon: Icons.ComponentEmbed,
            group: Group.MEDIA_CONTENT,
            text: 'Embed',
            description: 'Insert embeddable content',
        };
    }

    if (withCoverage) {
        yield {
            action: MenuAction.ADD_COVERAGE,
            icon: Icons.ComponentCoverage,
            group: Group.PREZLY_CONTENT,
            text: 'Coverage',
            description: 'Add a link to a Prezly Coverage',
        };
    }

    if (withPressContacts) {
        yield {
            action: MenuAction.ADD_CONTACT,
            icon: Icons.ComponentContact,
            group: Group.PREZLY_CONTENT,
            text: 'Site contact',
            keywords: ['signature'],
            description: 'Add a contact card or signature',
        };
    }

    if (withStoryBookmarks) {
        yield {
            action: MenuAction.ADD_STORY_BOOKMARK,
            icon: Icons.ComponentStoryBookmark,
            group: Group.PREZLY_CONTENT,
            text: 'Story bookmark',
            description: 'Embed your Prezly content',
        };
    }

    if (withStoryEmbeds) {
        yield {
            action: MenuAction.ADD_STORY_EMBED,
            icon: Icons.ComponentWebBookmark,
            group: Group.PREZLY_CONTENT,
            text: 'Story embed',
            description: 'Insert Prezly story content',
        };
    }

    if (withSnippets) {
        yield {
            action: MenuAction.ADD_SNIPPET,
            icon: Icons.ComponentSnippet,
            group: Group.PREZLY_CONTENT,
            text: 'Snippets',
            description: 'Insert reusable content blocks',
        };
    }

    if (withVideos && withSpecificProviderOptions) {
        yield {
            action: MenuAction.ADD_YOUTUBE,
            keywords: ['video', 'yt', 'reels', 'utube'],
            icon: Icons.ComponentYouTube,
            group: Group.VIDEOS,
            text: 'YouTube video',
            description: 'Embed a YouTube video',
        };
    }

    if (withEmbeds && withSpecificProviderOptions) {
        yield {
            action: MenuAction.ADD_X,
            icon: Icons.ComponentX,
            group: Group.SOCIAL_MEDIA,
            text: 'X',
            description: 'Embed a X post',
            keywords: ['twitter', 'tweet', 'social'],
        };

        yield {
            action: MenuAction.ADD_INSTAGRAM,
            icon: Icons.ComponentInstagram,
            group: Group.SOCIAL_MEDIA,
            text: 'Instagram',
            description: 'Embed an Instagram post',
            keywords: ['ig', 'photo', 'foto', 'social'],
        };
        yield {
            action: MenuAction.ADD_TIKTOK,
            keywords: ['social', 'video'],
            icon: Icons.ComponentTikTok,
            group: Group.SOCIAL_MEDIA,
            text: 'TikTok',
            description: 'Embed a TikTok video',
        };
        yield {
            action: MenuAction.ADD_DROPBOX,
            icon: Icons.ComponentDropbox,
            group: Group.FILE_N_DOCUMENTS,
            text: 'Dropbox',
            description: 'Embed a Dropbox file or folder',
            keywords: ['db', 'files', 'share'],
        };
        yield {
            action: MenuAction.ADD_SOUNDCLOUD,
            icon: Icons.ComponentSoundCloud,
            group: Group.AUDIO_MUSIC_PODCASTS,
            text: 'SoundCloud',
            description: 'Embed a SoundCloud audio file',
            keywords: ['audio', 'mp3', 'music', 'song', 'track'],
        };
        yield {
            action: MenuAction.ADD_SPOTIFY,
            icon: Icons.ComponentSpotify,
            group: Group.AUDIO_MUSIC_PODCASTS,
            text: 'Spotify',
            description: 'Embed a music, podcast or playlist',
            keywords: ['audio', 'mp3', 'music', 'song', 'track'],
        };
        yield {
            action: MenuAction.ADD_FACEBOOK,
            icon: Icons.ComponentFacebook,
            group: Group.SOCIAL_MEDIA,
            text: 'Facebook post',
            description: 'Embed a Facebook post',
            keywords: ['post', 'fb', 'social'],
        };
        yield {
            action: MenuAction.ADD_GIPHY,
            icon: Icons.ComponentGiphy,
            group: Group.OTHER,
            text: 'Giphy',
            description: 'Embed a GIF from Giphy',
            keywords: ['gif', 'video', 'photo', 'foto', 'social'],
        };
    }

    if (withVideos && withSpecificProviderOptions) {
        yield {
            action: MenuAction.ADD_VIMEO,
            keywords: ['video'],
            icon: Icons.ComponentVimeo,
            group: Group.VIDEOS,
            text: 'Vimeo',
            description: 'Embed a video from Vimeo',
        };
    }

    if (withEmbeds && withSpecificProviderOptions) {
        yield {
            action: MenuAction.ADD_CALENDLY,
            icon: Icons.ComponentCalendly,
            group: Group.OTHER,
            text: 'Calendly',
            description: 'Embed a calendar from Calendly',
            keywords: ['invite', 'event', 'schedule'],
        };
        yield {
            action: MenuAction.ADD_EVENTBRITE,
            icon: Icons.ComponentEventbrite,
            group: Group.OTHER,
            text: 'Eventbrite',
            description: 'Embed an event from Eventbrite',
            keywords: ['invite', 'event', 'schedule'],
        };
        yield {
            action: MenuAction.ADD_MICROSOFT_TEAMS,
            icon: Icons.ComponentMicrosoftTeams,
            group: Group.OTHER,
            text: 'Microsoft Teams',
            description: 'Embed a link to Microsoft Teams',
            keywords: ['teams', 'ms', 'meeting'],
        };
        yield {
            action: MenuAction.ADD_GOOGLE_MAPS,
            icon: Icons.ComponentGoogleMaps,
            group: Group.OTHER,
            text: 'Google Maps',
            description: 'Embed a map from Google Maps',
            keywords: ['map', 'address'],
        };
        yield {
            action: MenuAction.ADD_GOOGLE_DOCS,
            icon: Icons.ComponentGoogleDocs,
            group: Group.FILE_N_DOCUMENTS,
            text: 'Google Docs',
            description: 'Embed a document from Google Docs',
            keywords: ['doc', 'gdoc', 'document'],
        };
        yield {
            action: MenuAction.ADD_GOOGLE_SHEETS,
            icon: Icons.ComponentGoogleSheets,
            group: Group.FILE_N_DOCUMENTS,
            text: 'Google Sheets',
            description: 'Embed a spreadsheet',
            keywords: ['sheet', 'gsheet', 'spreadsheet'],
        };
        yield {
            action: MenuAction.ADD_TYPEFORM,
            icon: Icons.ComponentTypeform,
            group: Group.FORMS,
            text: 'Typeform',
            description: 'Embed a form from Typeform',
            keywords: ['form', 'survey'],
        };
        yield {
            action: MenuAction.ADD_TALLY,
            icon: Icons.ComponentTally,
            group: Group.FORMS,
            text: 'Tally',
            description: 'Embed a form from Tally',
            keywords: ['form', 'survey'],
        };
        yield {
            action: MenuAction.ADD_PINTEREST,
            icon: Icons.ComponentPinterest,
            group: Group.SOCIAL_MEDIA,
            text: 'Pinterest',
            description: 'Embed a Pinterest post',
            keywords: ['social', 'image'],
        };
    }

    /*
     * Intentionally not included:
     * - MenuAction.ADD_EMBED_VIDEO
     * - MenuAction.ADD_EMBED_LINK
     */
}
