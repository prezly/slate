import SignInFlow from './SignInFlow';
import UseCaseAnswer from './UseCaseAnswer';

export default interface UserAccountRef {
    avatar_url: string;
    created_at: string;
    display_name: string;
    email: string;
    first_name: string;
    id: number;
    is_terms_of_service_accepted: boolean;
    last_name: string;
    /**
     * Last time the user was active.
     */
    last_seen_at: string | null;
    sign_in_flow: SignInFlow;
    use_case_answer: UseCaseAnswer | null;
    /**
     * @deprecated Please use `email` instead.
     * @see email
     */
    username: string;
}
