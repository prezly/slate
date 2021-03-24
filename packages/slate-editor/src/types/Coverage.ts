import { UploadcareStoragePayload } from '@prezly/uploadcare';

import Contact from './Contact';
import NewsroomRef from './NewsroomRef';
import OEmbedInfo from './OEmbedInfo';
import Story from './Story';
import UserRef from './UserRef';

export default interface Coverage {
    attachment: UploadcareStoragePayload | null;
    attachment_oembed: OEmbedInfo | null;
    author_contact: Contact | null;
    avatar_url: string | null;
    display_name: string;
    headline: string;
    id: number;
    is_deleted: boolean;
    organisation_contact: Contact | null;
    newsroom: NewsroomRef | null;
    note_content_html: string;
    note_content_json: string;
    note_content_text: string;
    created_at: string;
    edited_at: string | null;
    published_at: string | null;
    story: Story | null;
    updated_at: string;
    url: string | null;
    user: UserRef;
    view_url: string;
}
