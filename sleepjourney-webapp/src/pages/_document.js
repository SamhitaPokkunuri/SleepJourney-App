/* eslint-disable @next/next/no-sync-scripts */
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { useAmp } from 'next/amp';
import { TEALIUM_ENV } from 'lib/analytics';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from 'utils/createEmotionCache';

const AmpMode = ({ children, display = true }) => {
  const isAmp = useAmp();
  if (display) {
    return isAmp ? children : null;
  }
  return isAmp ? null : children;
  s;
};

export default class MyDocument extends Document {
  render() {
    const { isProduction, emotionStyleTags } = this.props;

    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon/favicon.ico" />
          <AmpMode display={false}>
            <link
              rel="preload"
              href="/fonts/vodafone-regular.woff"
              as="font"
              crossOrigin=""
            />
            <link
              rel="preload"
              href="/fonts/vodafone-light.woff"
              as="font"
              crossOrigin=""
            />
            <link
              rel="preload"
              href="/fonts/vodafone-bold.woff"
              as="font"
              crossOrigin=""
            />
            <link
              rel="preload"
              href="/fonts/vodafone-black.woff"
              as="font"
              crossOrigin=""
            />
            <link
              rel="preload"
              href="/fonts/vodafone-icons.woff"
              as="font"
              crossOrigin=""
            />
            <meta
              httpEquiv="Content-Type"
              content="text/html"
              charSet="utf-8"
            />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </AmpMode>
          {/* Inject MUI styles first to match with the prepend: true configuration. */}
          {emotionStyleTags}
        </Head>
        <body>
          <AmpMode display={false}>
            {isProduction && (
              <>
                <script
                  type="text/javascript"
                  dangerouslySetInnerHTML={{
                    __html: `
                (function(a,b,c,d){
                  a='https://tags.tiqcdn.com/utag/vodafone/corp-main/${TEALIUM_ENV}/utag.js';
                  b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
                  a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
                })();
              `,
                  }}
                />
              </>
            )}
          </AmpMode>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);

  const emotionStyleTags = emotionStyles.styles.map((style) => {
    return (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    );
  });

  const isProduction =
    process.env.NODE_ENV === 'production' ||
    process.env.NEXT_PUBLIC_ENABLE_GA === 'true';

  return {
    ...initialProps,
    emotionStyleTags,
    isProduction,
  };
};
