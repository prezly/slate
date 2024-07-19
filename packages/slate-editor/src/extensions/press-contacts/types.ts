import type { NewsroomContact } from '@prezly/sdk';

export interface PressContactsExtensionParameters {
    onEdit?: (uuid: NewsroomContact['uuid']) => void;
}
