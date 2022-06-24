import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/martel';
import Head from 'next/head';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Layout from '../components/Layout';
import '../styles/globals.css';

const theme = extendTheme({
  fonts: {
    heading: 'Rubik',
    body: 'Raleway',
  },
});

const reactQueryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <link rel="mask-icon" href="/splash.png" color="#EDF2F7" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#EDF2F7" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="msapplication-tap-highlight" content="no" />

        <link rel="apple-touch-startup-image" href="/splash.png" />
      </Head>
      <QueryClientProvider client={reactQueryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Hydrate state={pageProps.dehydrateState}>
          <ChakraProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
