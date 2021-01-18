import Document, { Html, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
