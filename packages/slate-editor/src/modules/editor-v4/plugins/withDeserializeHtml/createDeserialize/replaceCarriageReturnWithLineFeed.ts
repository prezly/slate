export function replaceCarriageReturnWithLineFeed(text: string): string {
    return text.replace(/\r+\n?/g, '\n');
}

