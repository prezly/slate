import Culture from './Culture';
import NewsroomRef from './NewsroomRef';
import OEmbedInfo from './OEmbedInfo';
import StoryLifecycleStatus from './StoryLifecycleStatus';
import StoryPublicationStatus from './StoryPublicationStatus';
import StoryVisibility from './StoryVisibility';
import UserAccountRef from './UserAccountRef';

interface StoryRef {
    author: UserAccountRef | null;
    created_at: string;
    culture: Culture;
    id: number;
    /**
     * @deprecated Please use `status` instead.
     */
    lifecycle_status: StoryLifecycleStatus;
    /**
     * @deprecated Please use links from AppRouting.
     * @see AppRouting
     */
    links: {
        edit: string;
        newsroom_view: string;
        report: string;
    };
    oembed: OEmbedInfo;
    /**
     * @deprecated Please use `status` instead.
     */
    publication_status: StoryPublicationStatus;
    published_at: string | null;
    newsroom: NewsroomRef;
    scheduled_at: string | null;
    status: StoryLifecycleStatus;
    thumbnail_url: string;
    title: string;
    updated_at: string;
    url: string;
    uuid: string;
    visibility: StoryVisibility;
}

// eslint-disable-next-line no-undef
export default StoryRef;
