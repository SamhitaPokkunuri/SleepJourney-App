import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import MuiContainer from '@mui/material/Container';

import Error from './_error';
import { BasicPage, RenderBlock } from 'components';
import { getContentPathBlocks } from 'lib/graphql/getContentPathBlocks';
import { getMenu } from 'lib/graphql/getMenu';
import { getTaxonomyTerm } from 'lib/graphql/getTaxonomyTerm';
import isEmptyObject from 'utils/isEmptyObject';
import validateAndParseJSON from 'utils/validateAndParseJSON';

export default function GlobalSearchResults({
  node = {},
  preview = false,
  breadcrumb,
  path,
  error = null,
}) {
  const { title, heading, description, fieldHeroImage, bodyJson } = node;
  const { entity: featuredImage } = fieldHeroImage || {};
  const router = useRouter();
  const siteUrl = process.env.SITE_URL;

  // Keep here during dev, useful to see called routes
  // console.log('router alias', router);

  const blocks = validateAndParseJSON(bodyJson);

  // TODO: Clean up and combine with below error check
  if (isEmptyObject(node) || !blocks) {
    return <Error statusCode="400" />;
  }

  if (error) {
    return <Error statusCode={error.status} />;
  }

  // TODO: We need a better loading option. Should be in container
  // and we could use Facebook news lines??
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BasicPage
        preview={preview}
        breadcrumbs={breadcrumb}
        image={{
          url: featuredImage?.image?.url,
          title: heading || title,
        }}
      >
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
            RenderBlock(block, index, array)
          )}
        </MuiContainer>
      </BasicPage>
    </>
  );
}

export async function getServerSideProps(context) {
  const { preview = false } = context;

  const path = '/global-search-results';
  const data = await getContentPathBlocks(path);
  const links = await getMenu('main');
  const footerLinks = await getMenu('footer');
  const subFooterLinks = await getMenu('footer-sub-menu');
  const tagsData = await getTaxonomyTerm('tags');
  const categoriesData = await getTaxonomyTerm('categories');

  if (data == null) {
    return {
      props: {
        preview,
        error: {
          status: '404',
        },
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
    };
  }

  return {
    props: {
      preview,
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
  };
}
