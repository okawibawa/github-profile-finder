import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '@fontsource/inter';
import '@fontsource/inter/600.css';
import { QueryClientProvider, QueryClient } from 'react-query';

// create a rect query client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
