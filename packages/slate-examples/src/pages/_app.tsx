import 'normalize.css/normalize.css';
import '@prezly/content-renderer-react-js/build/styles.css';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import '../styles/globals.scss';

const App = ({ Component, pageProps }: AppProps) => (
    <>
        <Head>
            <title>@prezly/slate-examples</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="//cdnjs.cloudflare.com/ajax/libs/object-fit-images/3.2.4/ofi.min.js"></script>
        </Head>

        <Component {...pageProps} />
    </>
);

export default App;
