//Application dependencies
import { NextSeo } from 'next-seo';

// Vendor and internal dependencies
import {
  ContentList,
  FoundationPage,
  Section,
  Columns,
  Column,
  Heading,
  Spacer,
  SocialFeed,
  Paragraph,
} from 'components';
import { getCategory } from 'lib/graphql/getCategory';
import { getMenu } from 'lib/graphql/getMenu';

export async function getServerSideProps() {
  const response = await getCategory('vodafone-foundation');
  const { entity, breadcrumb, path } = response;
  const { entityId, entityLabel, fieldThumbnailImage } = entity;

  const links = await getMenu('main');
  const footerLinks = await getMenu('footer');
  const subFooterLinks = await getMenu('footer-sub-menu');

  return {
    props: {
      category: {
        categoryName: entityLabel,
        categoryID: entityId,
        fieldThumbnailImage: fieldThumbnailImage?.entity || '',
      },
      breadcrumb: breadcrumb,
      path: path,
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
    }, // will be passed to the page component as props
  };
}

export default function CategoryContent(props) {
  const { category, breadcrumb, path } = props;
  const { categoryID, categoryName, fieldThumbnailImage } = category;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const headerProps = {
    customColors: {
      text: '#FFFFFF',
      background: 'rgb(230, 0, 0)',
    },
    backgroundDivider: {
      hasDivider: true,
      hasOverlap: false,
      svgDivider: {
        divider: {
          name: 'wave-1',
          path:
            'M0,180C235.3,214.62,371.28,30,684,30c314.73,0,562.81,180,920,180,189,0,316-50,316-50V0H0Z',
          invertedPath:
            'M0,240H1920V160s-127,50-316,50C1246.81,210,998.73,30,684,30,371.28,30,235.3,214.62,0,180Z',
          viewBox: '0 0 1920 240',
          mobile: {
            path: 'M0,130V88s37.27,12,104,12c131.79,0,271-70,271-70V130Z',
            viewBox: '0 0 375 130',
          },
        },
        height: '240px',
        width: '100%',
        color: '#FFFFFF',
        flipped: false,
        inverted: false,
        dropShadow: false,
        align: 'bottom',
      },
    },
    backgroundAnimation: {
      hasAnimation: true,
      svgAnimation: {
        animation: {
          name: 'Globe',
          path:
            'M1922,6.53c-102-30.16-49.86,395.37-126,431.94-10.3,5.64-31.92.57-38.67,0s-10,7.7-14.07,7-5.32-6.51-6-10.09-8,4.41-9.58,0S1731,429,1729,424.89s-7.34-3.13-9.1-6.29,2.34-6.74,1.31-10.18-5.26-3.54-6.29-4.91-.86-2.17,0-4.73a11.15,11.15,0,0,0,0-5.62s-9.85-22.08-9.82-22.21c.59-12.28-6.07-30.16-6.07-30.16s-22.91-39.85-13.25-91.62c11.34-61,2.44-88.38,0-96.45s-3.17-8.24-5.29-12.71-4.76-2.71-8-7.76-4.7-8.78-9.74-12.57-4.18-4.38-5.14-11.25-.65-6.93-3.3-9.71c-41.62-39.81-109.08-42.15-111-41.69s6.87,4.43,5.5,6.37-9.71,0-14.48-1.87-9.81-2.6-10.49-2.18-6.31,2.5-9.57,4.37a26.21,26.21,0,0,0-6.15,5.5s2.22.89,6.15,2.1,4.87.9,6.06-2.1-1.93-2.16-8.37-3.83-14.57,1.27-16.6,2-6.16,6.11-5.57,4.67,7.94-2.31,10.33-1.62-1,3.79-2.4,4.09-4,5-4.09,6.06-2.09,1.7-5.06,5.65,1.13,5.55,3.26,5.83,1.08,1.94,4.2,2.3,4.86-.93,8.24-1.41,1,1.57,3,3.42,5.69,2.25,7,1.32-.5-3.7-.89-6.11-.7-4.56-1.79-5.63-1.57-2.9-3.12-6.12.4-3.58,3.51-4.23,4.64-.41,8.09.87,3.88,1.39,5.32-2.34,5.76.58,8.41,1.87,10,1,12.79,1.21,3.11,1.42,4.35,3.38,3.76,8.57,5.93,8.37a6.9,6.9,0,0,0,3.88-2.06,11.83,11.83,0,0,1,3.56.92c2.6.94.83-2,.37-2.83a8.92,8.92,0,0,0-3-2.62c-.84-.31-2.44.69-6.27,1.26s-4.72,1-6,2.32-9.66,2.91-11.83,5.22a16.2,16.2,0,0,0-3.29,6.09c.19-.2,1.29-1.47,5.26-3.18s2.72-1.27,3.2.79,2.53,2.31,6.13,1,2.54-3.91,5.85-1.78-.85,3-2.67,4.59,0,1.92-3.18,5.36-2-4.17-2-4.17-2.39,1.48-5.4,3.75-.23,4.39,1.06,7.89-3.86,3.5-6.51,4.36.32,2.08,1.61,7.24-.9,2.67-3.66,1,.2,3.12,2,5.19,1,5-1.43,8.49-1.36,3.39-2.4,6.88-.51,3.85-.41,4.83,8.37,8.2,6.69,10.34-3.84,2.09-7.46-2.8-12.9-1.39-14.2.31.4,2.62-6.17,4.32-11.31,7.84-11.31,7.84-1.67,8.75,1.53,15,11.7,4.73,15.3,3.64,6.17-11.37,7.52-11.28,2.93,2.22,3.25,5.69.37,3.32,2.49,4.13,1.05-.42,5.58-1.66,6.93.48,8.45,4.81,12.45-.7,12.45-.7a10.58,10.58,0,0,0,2.49-.95c2.17-1,6.83-6.12,8-7s1.73-.63,2.71,0,2.64.08,4.93-1.6,5.5-1.95,14.41-4.66,12.75-1.5,15.4-1.06.72,1.29,11.63-2,12.4,4.72,13,6.35,7.51-1.34,10-2.82,11.68-2.28,13-2.83,6.39.79,9.06,1,3.61,1.75,3.87,4.69-.78,8-1.57,9.27a9.24,9.24,0,0,0-1.47,6.78,39.91,39.91,0,0,1,.56,7.48S1660.7,212,1660.08,216s-4.35,7.07-8.3,9.94-3.9,8.69-4.07,12.71a26.69,26.69,0,0,1-3.75,11.57c-1.55,2.26-2,5.87-2.45,8.1s-8.62,2.46-8.62,2.46,3.73,3.48,4.86,6.49-4.08,5.1-5.85,6.45-1.73,4.7-2.82,5.92-2.73,2.42-2.33,4.48a12.54,12.54,0,0,1-.6,8.17,9.61,9.61,0,0,0,.6,8.36c.76,1.65-.71,3.69-1.28,10.26s2.28,6.17,5.55,4.5-.4-3-2.23-3.23-6.28,2.25-6.53,2.3-4.9-6.63-6.19-8.35-1.34-8.34-1.6-11-2.64-3.36-3-4.85-1.26-5.1-1.26-5.1-3.82-4.3-3.63-6.57,1.52-4.6,1.1-6.63-3-11.67-3-11.67-2.25-12.15-3.22-14-.9-2.25-.9-5.9c-.38-6.91-15.24-7-17.38-7.68s-9.55-7.47-9.67-7.68a34,34,0,0,0-7-3.8c-3.33-1.31-4.46-3.48-4.43-4.5s-2.1-5.52-3-7.62,2-5.83,3-9.55-3.08-6.6-4.51-6.79-3.1,1.61-4,2.84-6.06,1.14-10,1.22-9.81-4.17-11.24-4.46-6.11,2.38-8,2.61-6.41-1-7.64-1.4a3.45,3.45,0,0,0-3.25.88c-.62.64-3.19,1.62-4.52,2.37a26.51,26.51,0,0,1-8.48,1.75c-2.51,0-1.85-1-8.31-.54s-7-4.28-8.3-5.4-4-.42-7.45-4.53-11.88-12.53-13.25-10,9.43,11.21,11.88,14.21-3,2.18-4.33,1a24.65,24.65,0,0,0-5.24-3c-.85-.35-2.71-3.28-2.68-3.73s-4.22-4.19-4.33-5.54-4.71-5.6-6.15-6.18-3.9-5.57-4-7.1-2.31-3.83-2.42-4.15-.74-5.75-1.3-10.45.43-13.43,0-13.32c-12.26,24.32-18,62.52,1.42,109.25s55,61,69.44,66.31,16.78,1.76,19.57-2.42-2.87-6.29-3.49-6.91-2-2.76.5-2.65,1.6-.18,2-4.21,5.2-5.64,10.19-7,6.18,1.52,8.35,1.79,6.65-2.06,9.74-2.53,4-3.38,3.65-3.86-4.36-7.31-4.93-9.65-.88-6.29-1.57-7.77-2.45-2.21-4.75-6.07a5.73,5.73,0,0,0-6-3,17.36,17.36,0,0,0-7,1.2c-4.13,1.48-6,.57-8.38-.49s-2.3-1.78-3.49,0-2.07,1.28-3.76-.71-5.85-4.38-7.22-2.52-4.46,4.1-7.56,2.52-9-.43-12,1.2,3.48,9,1.75,10.64-7.38-1.51-10.49-4.76-3.38-.77-3.17.89a33.84,33.84,0,0,0,1.83,7.42c.76,1.47,1.57,4.47,1.35,9.65s2.42,14.3,6.26,22.48,27.47,18.78,43,29.56,29.71,41.12,42.76,61.77,32.48,16.16,32.48,16.16-1.71,1.13-18.06,5.05-27.73-8.36-30.92-14.64-18.75-48.56-59.56-68.34-76.32-63.18-89-117.59,11-113.44,70.23-152.83,142.38-11.38,177.6,31c30.22,36.39,43.81,84.49,36.93,121.81-14.89,80.8,1.32,105.74,5.61,115.29s12.21,34.2,0,43.43c-24.77,19.14-113.39,50.39-113.39,50.39s6.53,14.43,8.18,19.26,7.77,2.72,9.35,5.52-2,7.88-1.2,11.5,7.22,2.52,9.12,5.6-1.5,9.45-.54,13.09,4.43-1.31,7.13,3.82.15,9.5,0,12.26,7.56,0,7.16,3.47.67,4.27,23.42,2,87.7-39.33,87.7-39.33L1732.18,488s-44.15,19.65-48.52,21.63-5.11,8.57-3.14,8,34.56-14.72,45.1-20.85c-1.45,8-14.21,22.39-26.43,26.71s-37.09-3.7-67.63-10.08c-156-27.39-213.84,91.58-661.31,33.38C326,455.77,294.92,497.55-2,508.83',
          viewBox: '0 0 1920 568',
          position: 'right',
        },
        flipped: false,
        strokeColor: '#FFFFFF',
        anchor: 'bottom',
        offset: -180,
      },
    },
  };
  const newsProps = {
    customColors: {
      text: '',
      background: '',
    },
    backgroundDivider: {
      hasDivider: true,
      hasOverlap: false,
      svgDivider: {
        divider: {
          name: 'wave-3',
          path:
            'M0,210S250,30,656,30c373.46,0,578.16,126,922,126,167.74,0,342-64,342-64V0H0Z',
          invertedPath:
            'M0,240H1920V92s-174.26,64-342,64c-343.84,0-548.54-126-922-126C250,30,0,210,0,210Z',
          viewBox: '0 0 1920 240',
          mobile: {
            path: 'M0,130V88s37.27,12,104,12c131.79,0,271-70,271-70V130Z',
            viewBox: '0 0 375 130',
          },
        },
        height: '240px',
        width: '100%',
        color: '#F4F4F4',
        flipped: false,
        inverted: false,
        dropShadow: true,
        align: 'bottom',
      },
    },
    backgroundAnimation: {
      hasAnimation: false,
    },
  };
  const socialProps = {
    customColors: {
      text: '',
      background: '#F4F4F4',
    },
    backgroundDivider: {
      hasDivider: false,
    },
    backgroundAnimation: {
      hasAnimation: true,
      svgAnimation: {
        animation: {
          name: 'Social',
          path:
            'M-2,151.9c33,26.8,292.1,211.1,906.9-27.1c225.4-71.6,330.1,220.1,534.2,232.6c10.7,0.5,9.8,2.3,9.8,2.3 s3.7,32.5,39.9,34.3s102.8,3.8,102.8,3.8s41.7,3.8,29.3-33.2s-50.6-152.3-50.6-152.3s-49.5,13.1-59.6-19.4c0.5-0.1-5.1-1.4-4.9-5 s47.1-18.3,47.1-18.3l-36-118.6c0,0-2.9-21.5-37.7-22.9s-100.8-3.2-100.8-3.2s-34.2-3.6-25,26.2s43.3,143.2,43.3,143.2 s-19.9-1.8-21.8,15.4s17.8,27,34.9,27.6c0-0.3-18.8,3.3-17.3,13.2s8,10.4,8,10.4s-14.4,16,25.9,34.2c0.4,0,18,53.9,18,53.9 s7.4-4.4,9,0s4.7,32.3,37.6,33.2s111.6,3.7,111.6,3.7s22.1,2.6,9.6-30.2c0.3-0.3-142.6-4.4-142.6-4.4s-6.1,0.9-9.6-11.4 s-93.3-301.1-93.3-301.1s-1.7-8.9,11.7-8.4s109.4,3.7,109.4,3.7s17.3-0.4,25,24.6s24,77.6,24,77.6s25.8,12.3,68,7.4 s69.8-40.6,66-70.4s-36.5-73.1-107.6-67.7s-82.7,57.5-79.8,75.7s16.7,35.4,27.3,44.5c-0.1,0-10.8,26.9-37.7,44.8 c-0.1-0.3,53.5-12,66.1-26.8c0.3,0.1,8.8,27.6,8.8,27.6l22.4-8.1c0,0,8.3-7.4,27.6-2s26.8,9,47.6,11.5s31.3,2.6,43.6,28.9 s42.7,58.8,46.7,68.9s47.9,26.6,52.4,44.6s10.4,70.5-21.2,134c-0.4,0-104.4-16-118.8-23.3s-17.9-8.5-27.3-9.7s-40.6-2.5-53.7-12.3 c0.3-0.5,35.6,0,35.6,0s37.2-3.4,25.9-39.1S1586,237.2,1586,237.2s35.5-9.5,28.5-16.7s-35.6-6.9-35.6-6.9s61.2-6.4,49.8,13.2 s-42.5,113.2,60.4,116.2s105.7-27.2,106.1-45.6c0.1-0.6,72.7-2.4,125.2,12.7l1.6,0.5',
          viewBox: '0 0 1920 454',
          position: 'right',
        },
        flipped: false,
        strokeColor: 'rgb(230, 0, 0)',
        anchor: 'top',
        offset: 40,
      },
    },
  };

  return (
    <FoundationPage
      breadcrumbs={breadcrumb}
      customHeader
      image={{
        url: fieldThumbnailImage?.image?.url,
        title: categoryName,
      }}
    >
      <NextSeo
        title={categoryName}
        description={`${categoryName} news`}
        canonical={path === '/home' ? siteUrl : `${siteUrl}${path}`}
        openGraph={{
          title: fieldThumbnailImage?.image?.title,
          images: [
            {
              url: fieldThumbnailImage?.image?.url,
              width: fieldThumbnailImage?.image?.width,
              height: fieldThumbnailImage?.image?.height,
              alt: fieldThumbnailImage?.image?.alt,
            },
          ],
          site_name: 'Vodafone.com',
        }}
      />
      <Section {...headerProps}>
        <Columns>
          <Column>
            <Heading variant="h1">Latest News</Heading>
            <Spacer
              height={200}
              responsiveControl={{
                mobile: true,
                tablet: false,
                desktop: false,
              }}
            />
          </Column>
          <Column />
        </Columns>
      </Section>
      <Section {...newsProps}>
        <ContentList
          customContentList={true}
          searchFilter={{
            pagination: true,
            dateRange: true,
            paginationType: 'load-more',
            selectedCategories: [categoryID],
          }}
          title="category"
          contentStyle={[1, 3]}
          showCategory={true}
          showDate={true}
          showDescription={true}
          showImages={true}
          showShareIcons={true}
          showTags={true}
          sources={{
            mode: 'search-filter',
            maxArticles: 10,
            categories: [categoryID],
            sortRule: 'date',
            sortingDirection: 'desc',
          }}
          categories={[categoryID]}
        />
      </Section>
      <Section {...socialProps}>
        <Spacer
          height={300}
          responsiveControl={{ mobile: true, tablet: false, desktop: false }}
        />
        <Columns>
          <Column width={70}>
            <Heading variant="h2">Keep up-to-date with us</Heading>
            <Paragraph>
              Follow our social channels to get news and updates on the activity
              and impact we are having across the globe.
            </Paragraph>
          </Column>
          <Column width={30} />
        </Columns>
        <SocialFeed
          appearance="rounded"
          hasInstagram
          hasTwitter
          instagramFeed="Vodafone Foundation"
          instagramPostCount={2}
          twitterFeed="Vodafone Foundation"
          twitterPostCount={2}
        />
      </Section>
    </FoundationPage>
  );
}
