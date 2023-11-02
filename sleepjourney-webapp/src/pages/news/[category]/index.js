//Application dependencies
import { NextSeo } from 'next-seo';

// Vendor and internal dependencies
import { ContentList, BasicPage, Section } from 'components';
import { getCategory } from 'lib/graphql/getCategory';
import { getMenu } from 'lib/graphql/getMenu';

export async function getServerSideProps(context) {
  const { params } = context;

  const response = await getCategory(params.category);
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

  return (
    <BasicPage
      breadcrumbs={breadcrumb}
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
      <Section>
        <ContentList
          customContentList={true}
          searchFilter={{
            pagination: true,
            dateRange: true,
            paginationType: 'load-more',
            selectedCategories: [categoryID],
          }}
          title="category"
          contentStyle={[2]}
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
    </BasicPage>
  );
}
