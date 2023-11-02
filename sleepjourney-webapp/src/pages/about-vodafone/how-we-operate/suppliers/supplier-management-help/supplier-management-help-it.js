import { useRouter } from 'next/router';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import MuiContainer from '@mui/material/Container';

import Error from 'pages/_error';
import { BasicPage, RenderBlock } from 'components';
import { getContentPathBlocks } from 'lib/graphql/getContentPathBlocks';
import { getMenu } from 'lib/graphql/getMenu';
import isEmptyObject from 'utils/isEmptyObject';
import validateAndParseJSON from 'utils/validateAndParseJSON';

export async function getServerSideProps(context) {
  const { preview = false, previewData } = context;
  const data = await getContentPathBlocks(
    '/about-vodafone/how-we-operate/suppliers/supplier-management-help/supplier-management-help-it',
    preview,
    previewData
  );
  const links = await getMenu('main');
  const footerLinks = await getMenu('footer');
  const subFooterLinks = await getMenu('footer-sub-menu');

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
      // breadcrumb: data.breadcrumb,
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
        },
      },
    },
  };
}

export default function SupplierManagementHelpDe({
  node = {},
  preview = false,
  // breadcrumb,
  path,
  error = null,
}) {
  const { title, heading, description, fieldHeroImage, bodyJson } = node;
  const { entity: featuredImage } = fieldHeroImage || {};
  const router = useRouter();
  const siteUrl = process.env.SITE_URL;

  const blocks = validateAndParseJSON(bodyJson, path);

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

  if (typeof window !== 'undefined') {
    window.aca_chat_app_url =
      'https://vf-finance-chat.eu-de.mybluemix.net/?wa=it';
    window.document.dispatchEvent(new Event('DOMContentLoaded'));
  }

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://vf-finance-chat.eu-de.mybluemix.net/assets/widgets/aca-chat-widget.css"
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                window.aca_chat_app_url = 'https://vf-finance-chat.eu-de.mybluemix.net/?wa=it'
              })();
            `,
          }}
        />
        <script src="https://vf-finance-chat.eu-de.mybluemix.net/assets/widgets/aca-chat-widget.js" />
      </Head>
      <BasicPage
        preview={preview}
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
