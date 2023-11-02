// Vendor and internal dependencies
import { Footer, Meta, Header, PreviewBar, Main } from 'components';

export default function Layout(props) {
  const { preview, children } = props;

  return (
    <>
      <Meta isHomePage />
      {preview && <PreviewBar />}
      <Header preview={preview} />
      <Main preview={preview}>{children}</Main>
      <Footer />
    </>
  );
}
