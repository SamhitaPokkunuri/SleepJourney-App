// Vendor and internal dependencies
import {
  Meta,
  Header,
  Main,
  Breadcrumbs,
  PreviewBar,
  Banner,
} from 'components';

export default function Layout({
  preview,
  breadcrumbs,
  children,
  image,
  customHeader,
}) {
  return (
    <>
      <Meta />
      {preview && <PreviewBar />}
      <Header preview={preview} nonav />
      <Main preview={preview}>
        {!customHeader && (
          <Banner
            media={{ type: 'image', url: image?.url }}
            title={image?.title}
          />
        )}
        <Breadcrumbs
          breadcrumbs={breadcrumbs || []}
          foundation={customHeader}
        />
        {children}
      </Main>
    </>
  );
}
