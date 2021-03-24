import { getClampedRatioInPercent, getClampedWidthInPercent, increaseWidth } from './lib';

describe('lib.ts', () => {
    describe('getClampedRatioInPercent', () => {
        it('should return 42.86 %', () => {
            const result = getClampedRatioInPercent(300, 700).toFixed(2);
            expect(result).toEqual('42.86');
        });

        it('should return 100 %', () => {
            const result = getClampedRatioInPercent(900, 700).toFixed(2);
            expect(result).toEqual('100.00');
        });
    });

    describe('getClampedWidthInPercent', () => {
        it('should return 100 %', () => {
            const result = getClampedWidthInPercent(1200, 1000, 100).toFixed(2);
            expect(result).toEqual('100.00');
        });

        it('should return 50 %', () => {
            const result = getClampedWidthInPercent(600, 1000, 50).toFixed(2);
            expect(result).toEqual('50.00');
        });

        it('should return 25 %', () => {
            const result = getClampedWidthInPercent(250, 1000, 50).toFixed(2);
            expect(result).toEqual('25.00');
        });
    });

    describe('increaseWidth', () => {
        it('should increase width to 310', () => {
            const result = increaseWidth(300, 10, 100, 400);
            expect(result).toEqual(310);
        });

        it('should limit width to 300', () => {
            const result = increaseWidth(299, 10, 100, 300);
            expect(result).toEqual(300);
        });

        it('should limit width to 100', () => {
            const result = increaseWidth(120, -25, 100, 300);
            expect(result).toEqual(100);
        });
    });
});
