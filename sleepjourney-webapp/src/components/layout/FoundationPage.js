//Application dependencies
import { createContext } from 'react';

// Vendor and internal dependencies
import { Footer, Meta, Header, Main, PreviewBar, Banner } from 'components';

export const ThemeContext = createContext('corporate');

export default function Layout({ preview, children, image, customHeader }) {
  return (
    <ThemeContext.Provider value="foundation">
      <Meta />
      {preview && <PreviewBar />}
      <Header preview={preview} foundation={true} />
      <Main preview={preview}>
        {!customHeader && (
          <Banner
            media={{ type: 'image', url: image?.url }}
            title={image?.title}
          />
        )}
        {children}
      </Main>
      <Footer />
    </ThemeContext.Provider>
  );
}
