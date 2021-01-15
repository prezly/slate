export default interface MentionNode {
    type: 'mention';
    user: {
        avatar_url: string;
        id: number;
        name: string;
    };
}
