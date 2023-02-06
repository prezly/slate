import { ContactInfo } from './ContactInfo';

describe('ContactInfo', () => {
    describe('normalize()', () => {
        it('should normalize empty object', () => {
            expect(ContactInfo.normalize({} as ContactInfo)).toEqual({
                avatar_url: null,
                name: '',
                company: '',
                description: '',
                address: '',
                email: '',
                website: '',
                phone: '',
                mobile: '',
                facebook: '',
                twitter: '',
            });
        });

        it('should normalize empty avatar_url string to null', () => {
            expect(ContactInfo.normalize({ avatar_url: '' } as ContactInfo)).toEqual({
                avatar_url: null,
                name: '',
                company: '',
                description: '',
                address: '',
                email: '',
                website: '',
                phone: '',
                mobile: '',
                facebook: '',
                twitter: '',
            });
        });
    });
});
