import replaceCarriageReturnWithLineFeed from './replaceCarriageReturnWithLineFeed';

describe('replaceCarriageReturnWithLineFeed', () => {
    it('should replace CR with LF', () => {
        const text =
            'First paragraph\r\nSecond paragraph\r\r\r\nThird paragraph\nFourth paragraph\rFifth paragraph';
        const result = replaceCarriageReturnWithLineFeed(text);
        expect(result).toEqual(
            'First paragraph\nSecond paragraph\nThird paragraph\nFourth paragraph\nFifth paragraph',
        );
    });
});
