import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import Script from 'next/script';
import MuiContainer from '@mui/material/Container';

import Error from 'pages/_error';
import {
  LandingPage,
  BasicArticle,
  BasicPage,
  FoundationPage,
  VideoPage,
  OverlayPage,
  NoNavPage,
  RenderBlock,
  Overlay,
} from 'components';
import searchRedirect from 'utils/searchRedirect';
import { getContentPathBlocks } from 'lib/graphql/getContentPathBlocks';
import { getAllContentPaths } from 'lib/graphql/getAllContentPaths';
import { getMenu } from 'lib/graphql/getMenu';
import { getTaxonomyTerm } from 'lib/graphql/getTaxonomyTerm';
import isEmptyObject from 'utils/isEmptyObject';
import validateAndParseJSON from 'utils/validateAndParseJSON';
import { useOverlayRoute } from 'hooks/useOverlayRoute';
import { TEALIUM_ENV } from 'lib/analytics';

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
  no_nav_page: NoNavPage,
};

export async function getStaticProps({ params }) {
  const path =
    JSON.stringify(params) === '{}' ? 'home' : params.alias.join('/');
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

  const searchResults = searchRedirect(path);

  if (searchResults.data && searchResults.data.length > 0) {
    return {
      redirect: {
        destination: searchResults?.daynamicPath
          ? searchResults.data[0].destination.replace(
              ':path',
              searchResults.daynamicPath
            )
          : searchResults.data[0].destination,
        statusCode: 301,
      },
    };
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

export async function getStaticPaths() {
  const allPaths = await getAllContentPaths();

  let paths = [];
  paths = allPaths.map((alias) => {
    return {
      params: {
        alias,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export default function CatchAllPaths({ node = {}, breadcrumb, path }) {
  const {
    id,
    title,
    heading,
    description,
    customHeader,
    fieldHeroImage,
    fieldThumbnailImage,
    fieldCategory,
    fieldTags,
    fieldDisplayDateCategory,
    fieldParent,
    createdDate,
    type,
    bodyJson,
  } = node;
  const { entity: featuredImage } =
    type === 'basic_article'
      ? fieldHeroImage || fieldThumbnailImage || {}
      : fieldHeroImage || {};
  const seoImage =
    (fieldHeroImage && fieldHeroImage.entity) ||
    (fieldThumbnailImage && fieldThumbnailImage.entity);
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
        postID={id}
        postType={type}
        category={fieldCategory?.entity?.name}
        categoryID={fieldCategory?.entity?.entityId}
        categoryColor={fieldCategory?.entity?.fieldColour}
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
            <Script
              src={`https://tags.tiqcdn.com/utag/vodafone/corp-main/${TEALIUM_ENV}/utag.sync.js`}
            />
            <NextSeo
              title={title}
              description={description}
              canonical={path === '/home' ? siteUrl : `${siteUrl}${path}`}
              openGraph={{
                title: seoImage?.image?.title,
                images: [
                  {
                    url: seoImage?.image?.url,
                    width: seoImage?.image?.width,
                    height: seoImage?.image?.height,
                    alt: seoImage?.image?.alt,
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
