const replaceCarriageReturnWithLineFeed = (text: string) => text.replace(/\r+\n?/g, '\n');

export default replaceCarriageReturnWithLineFeed;
