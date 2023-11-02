import Head from 'next/head';
import MuiContainer from '@mui/material/Container';

import Error from '../_error';
import {
  LandingPage,
  BasicArticle,
  BasicPage,
  FoundationPage,
  VideoPage,
  NoNavPage,
  OverlayPage,
  RenderBlock,
} from 'components';
import { getPreviewPathBlocks } from 'lib/graphql/getPreviewPathBlocks';
import validateAndParseJSON from 'utils/validateAndParseJSON';

const layouts = {
  page: BasicPage,
  basic_article: BasicArticle,
  landing_page: LandingPage,
  dreamlab_page: BasicPage,
  dreamlab_news: BasicArticle,
  video: VideoPage,
  foundation_page: FoundationPage,
  sdg: BasicPage,
  basic_page_noindex: BasicPage,
  no_nav_page: NoNavPage,
  overlay: OverlayPage,
};

export async function getServerSideProps(context) {
  const { params, preview = false, previewData } = context;
  const data = await getPreviewPathBlocks(params.id);

  if (preview && data != null) {
    // TODO: We should call the exit-preview endpoint here
    const {
      bodyJson,
      title,
      type,
      description,
      heading,
      fieldHeroImage,
      entityUrl: { breadcrumb },
    } = data;

    return {
      props: {
        bodyJson,
        title,
        description,
        fieldHeroImage,
        heading,
        type,
        preview,
        previewData,
        breadcrumb,
      },
    };
  }

  return {
    props: {
      preview,
      error: {
        status: '404',
      },
    },
  };
}

export default function PreviewContent(props) {
  const {
    preview,
    type,
    title,
    heading,
    bodyJson,
    breadcrumb = [],
    fieldHeroImage,
    error = null,
  } = props;
  const LayoutComponent = layouts[type || 'page'];
  const { entity: featuredImage } = fieldHeroImage || {};
  const blocks = validateAndParseJSON(bodyJson);

  const showBreadcrumbs = [
    'basic_article',
    'dreamlab_page',
    'dreamlab_news',
  ].includes(type);

  // const router = useRouter();
  // Keep here during dev, useful to see called routes
  // console.log('router preview', router);

  if (error) {
    return <Error statusCode={error.status} />;
  }

  return (
    <>
      <LayoutComponent
        preview={preview}
        breadcrumbs={showBreadcrumbs && breadcrumb}
        image={{
          url: featuredImage?.image?.url,
          title: heading || title,
        }}
      >
        <Head>
          <title>{title}</title>
        </Head>
        <MuiContainer maxWidth={false}>
          {blocks.map((block, index, array) =>
            RenderBlock(block, index, array)
          )}
        </MuiContainer>
      </LayoutComponent>
    </>
  );
}
