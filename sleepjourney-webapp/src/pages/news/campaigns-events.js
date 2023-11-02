import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import MuiContainer from '@mui/material/Container';

import Error from 'pages/_error';
import {
  LandingPage,
  BasicArticle,
  BasicPage,
  FoundationPage,
  VideoPage,
  OverlayPage,
  RenderBlock,
  Overlay,
} from 'components';
import { getContentPathBlocks } from 'lib/graphql/getContentPathBlocks';
import { getMenu } from 'lib/graphql/getMenu';
import { getTaxonomyTerm } from 'lib/graphql/getTaxonomyTerm';
import isEmptyObject from 'utils/isEmptyObject';
import validateAndParseJSON from 'utils/validateAndParseJSON';
import { useOverlayRoute } from 'hooks/useOverlayRoute';

const isProduction = process.env.NODE_ENV === 'production';

const layouts = {
  page: BasicPage,
  basic_article: BasicArticle,
  landing_page: LandingPage,
  dreamlab_page: BasicPage,
  dreamlab_news: BasicArticle,
  video: VideoPage,
  foundation_page: FoundationPage,
  sdg: OverlayPage,
  basic_page_noindex: BasicPage,
  overlay: OverlayPage,
  mwc_demo: OverlayPage,
};

export async function getStaticProps() {
  const path = '/news/campaigns-events';
  const data = await getContentPathBlocks(path);
  const links = await getMenu('main');
  const tagsData = await getTaxonomyTerm('tags');
  const categoriesData = await getTaxonomyTerm('categories');
  const subFooterLinks = await getMenu('footer-sub-menu');
  let footerLinks = [];

  if (data?.node?.type === 'foundation_page') {
    footerLinks = await getMenu('foundation-footer');
  } else {
    footerLinks = await getMenu('footer');
  }

  if (data == null) {
    return {
      props: {
        initialReduxState: {
          ui: {
            countrySelector: {
              isExpanded: false,
              isVisible: false,
              expanded: [],
            },
            mainMenu: {
              mobileDrawerOpen: false,
              desktopDrawerOpen: false,
              isAnimating: false,
              breadcrumbs: [],
              expanded: [],
              heights: [],
              links,
            },
            inpageNavigation: {
              isSticky: false,
            },
            footerMenu: {
              footerLinks,
            },
            subFooterMenu: {
              subFooterLinks,
            },
            globalSearch: {
              isExpanded: false,
              value: '',
            },
            tagsData: [],
            categoriesData: [],
          },
        },
      },
      revalidate: isProduction ? 60 : 1,
      notFound: true,
    };
  }

  return {
    props: {
      node: data && data.node,
      path: data.path,
      breadcrumb: data.breadcrumb,
      initialReduxState: {
        ui: {
          countrySelector: {
            isExpanded: false,
            isVisible: false,
            expanded: [],
          },
          mainMenu: {
            mobileDrawerOpen: false,
            desktopDrawerOpen: false,
            isAnimating: false,
            breadcrumbs: [],
            expanded: [],
            heights: [],
            links,
          },
          inpageNavigation: {
            isSticky: false,
          },
          footerMenu: {
            footerLinks,
          },
          subFooterMenu: {
            subFooterLinks,
          },
          globalSearch: {
            isExpanded: false,
            value: '',
          },
          tagsData: tagsData,
          categoriesData: categoriesData,
        },
      },
    },
    revalidate: isProduction ? 60 : 1,
  };
}

export default function NewsContactUs({ node = {}, breadcrumb, path }) {
  const {
    title,
    heading,
    description,
    customHeader,
    fieldHeroImage,
    fieldCategory,
    fieldTags,
    fieldDisplayDateCategory,
    fieldParent,
    createdDate,
    type,
    bodyJson,
  } = node;
  const { entity: featuredImage } = fieldHeroImage || {};
  const LayoutComponent = layouts[type];
  const router = useRouter();
  const { returnHref } = useOverlayRoute();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const blocks = validateAndParseJSON(bodyJson, path);
  if (isEmptyObject(node) || !blocks) {
    return <Error statusCode="400" />;
  }

  const showBreadcrumbs = [
    'basic_article',
    'dreamlab_page',
    'dreamlab_news',
  ].includes(type);

  const onDialogClose = (e) => {
    if (!e) {
      router.push(returnHref);
    }
  };

  return (
    <>
      {!!router.query.overlay && (
        <Overlay
          open={!!router.query.overlay}
          setOpen={onDialogClose}
          path={router.query.overlay}
        />
      )}
      <LayoutComponent
        breadcrumbs={showBreadcrumbs && breadcrumb}
        image={{
          url: featuredImage?.image?.url,
          title: heading || title,
        }}
        category={fieldCategory?.entity?.name}
        tags={fieldTags}
        date={createdDate}
        showDateCat={fieldDisplayDateCategory}
        title={title}
        description={description}
        customHeader={customHeader}
        canonical={path === '/home' ? siteUrl : `${siteUrl}${path}`}
        fieldParent={fieldParent}
        firstSection={Boolean(blocks[0]?.name === 'vdfblocks/section')}
      >
        {type !== 'web_stories' && (
          <>
            <NextSeo
              title={title}
              description={description}
              canonical={path === '/home' ? siteUrl : `${siteUrl}${path}`}
              openGraph={{
                title: featuredImage?.image?.title,
                images: [
                  {
                    url: featuredImage?.image?.url,
                    width: featuredImage?.image?.width,
                    height: featuredImage?.image?.height,
                    alt: featuredImage?.image?.alt,
                  },
                ],
                site_name: 'Vodafone.com',
              }}
            />
            <MuiContainer maxWidth={false}>
              {blocks.map((block, index, array) =>
                RenderBlock(block, index, array, customHeader)
              )}
            </MuiContainer>
          </>
        )}
      </LayoutComponent>
    </>
  );
}
