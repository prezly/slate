export default interface NewsroomRef {
    id: number;
    display_name: string;
    thumbnail_url: string;
    name: string;
    subdomain: string;
    timezone?: string;
    is_active: boolean;
    is_archived: boolean;
    is_multilingual: boolean;
    is_online: boolean;
    /**
     * @deprecated Please use `is_online` instead
     */
    is_offline: boolean;
    url: string;
    links: {
        media_gallery_api: string;
        room_contacts_api: string;
        analytics_and_visibility_settings: string;
        categories_management: string;
        company_info_settings: string;
        contacts_management: string;
        domain_settings: string;
        edit: string;
        gallery_management: string;
        hub_settings: string;
        languages: string;
        look_and_feel_settings: string;
        manual_subscription_management: string;
        privacy_settings: string;
        widget_settings: string;
    };
    uuid: string;
}
