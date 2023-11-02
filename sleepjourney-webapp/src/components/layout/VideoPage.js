// Vendor and internal dependencies
import {
  SocialShare,
  Header,
  Section,
  Footer,
  Main,
  Meta,
  PreviewBar,
} from 'components';

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      {preview && <PreviewBar />}
      <Header preview={preview} />
      <Main preview={preview}>
        <Section
          customColors={{ text: '#FFFFFF', background: '#4a4d4e' }}
          className="vdf-text-white vdf-background-stonegrey"
        >
          {
            // TO DO add date
          }
          <SocialShare
            facebook
            linkedin
            twitter
            type="fill"
            fontSize="small"
            className="is-style-light"
          />
        </Section>
        {children}
      </Main>
      <Footer />
    </>
  );
}
