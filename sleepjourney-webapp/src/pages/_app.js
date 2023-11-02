import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from 'utils/createEmotionCache';

import { useStore } from 'store';
import * as analytics from 'lib/analytics';
import theme from 'styles/theme';
import 'styles/overrides.css';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const router = useRouter();
  const lang = ['-it', '-es', '-de'].some((lang) =>
    router.pathname.endsWith(lang)
  )
    ? null
    : 'en';

  useEffect(() => {
    const handleRouteChange = (url) => {
      analytics.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    lang !== null ? (document.documentElement.lang = lang) : '';
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, lang]);

  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default App;
