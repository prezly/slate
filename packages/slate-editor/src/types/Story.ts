import Category from './Category';
import Culture from './Culture';
import NewsroomRef from './NewsroomRef';
import OEmbedInfo from './OEmbedInfo';
import StoryLifecycleStatus from './StoryLifecycleStatus';
import StoryPublicationStatus from './StoryPublicationStatus';
import StoryRef from './StoryRef';
import StoryVisibility from './StoryVisibility';
import UserAccountRef from './UserAccountRef';

interface Story {
    author: UserAccountRef | null;
    categories: Category[];
    coverage_number: number;
    created_at: string;
    culture: Culture;
    format_version: number;
    id: number;
    images_number: number;
    intro: string;
    is_analytics_available: boolean;
    is_archived: boolean;
    is_draft: boolean;
    is_embargo: boolean;
    is_finalized: boolean;
    is_private: boolean;
    is_published: boolean;
    is_scheduled: boolean;
    is_sharable: boolean;
    is_shared_to_prpro: boolean;
    language: string;
    last_coverage_at: string | null;
    /**
     * @deprecated Please use `status` instead.
     */
    lifecycle_status: StoryLifecycleStatus;
    /**
     * @deprecated Please use links from AppRouting.
     * @see AppRouting
     */
    links: {
        analytics: string;
        api: string;
        duplicate: string | null;
        edit: string | null;
        newsroom_preview: string;
        newsroom_view: string | null;
        preview: string;
        publication_api: string;
        reports_api: string;
        sharing: string;
        short: string | null;
        translate: string | null;
    };
    oembed: OEmbedInfo;
    /**
     * @deprecated Please use `status` instead.
     */
    publication_status: StoryPublicationStatus;
    published_at: string | null;
    newsroom: NewsroomRef;
    scheduled_at: string | null;
    slug: string;
    status: StoryLifecycleStatus;
    subtitle: string;
    thumbnail_url: string;
    title: string;
    translations: StoryRef[];
    updated_at: string;
    uuid: string;
    videos_number: number;
    visibility: StoryVisibility;
}

// eslint-disable-next-line no-undef
export default Story;
