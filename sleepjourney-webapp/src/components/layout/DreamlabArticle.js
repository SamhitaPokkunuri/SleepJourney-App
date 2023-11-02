// Vendor and internal dependencies
import { Footer, Meta, Main } from 'components';

export default function Layout({ children }) {
  return (
    <>
      <Meta />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
