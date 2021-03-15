import ContactRef from './ContactRef';

export enum Status {
    UNSEEN = 'unseen',
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
}

export default interface ContactDuplicateSuggestion {
    contact: ContactRef;
    /**
     * Value in range 0.0 ... 1.0.
     */
    score: number;
    status: Status;
    links: {
        merge_api: string;
    };
}
