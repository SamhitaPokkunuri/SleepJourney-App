import NextLink from 'next/link';
import { styled, css } from '@mui/material/styles';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';

import { BasicPage, Section } from 'components';
import { getContentPathBlocks } from 'lib/graphql/getContentPathBlocks';
import { getMenu } from 'lib/graphql/getMenu';

const StyledSitemap = styled(MuiList)(
  ({ theme }) => css`
    margin: 0;
    padding: 0;

    li {
      display: block;
      padding: 0;
    }

    a {
      display: block;
      text-decoration: none;
      font-weight: 300;
      padding-bottom: ${theme.spacing(1)};
      transition: 300ms ease;

      &:hover {
        color: ${theme.palette.common.red};
      }

      ${theme.breakpoints.up('md')} {
        font-size: 1.125rem;
      }
    }

    &.level-1 {
      font-variant: normal;

      & > li > a {
        font-size: 1.375rem;

        ${theme.breakpoints.up('md')} {
          font-size: 1.75rem;
        }
      }
    }

    &.level-2 {
      display: flex;
      flex-wrap: wrap;
      padding: ${theme.spacing(0, 0, 1)};

      a {
        font-weight: 700;
      }

      & > li {
        margin: ${theme.spacing(0, 1, 1)};
      }

      & > li > a {
        font-size: 1.125rem;
        padding-bottom: ${theme.spacing(1)};
        margin-bottom: ${theme.spacing(1)};
        border-bottom: 2px solid ${theme.palette.common.silver};
      }

      ${theme.breakpoints.up('sm')} {
        padding-left: ${theme.spacing(2)};
        padding-right: ${theme.spacing(2)};

        & > li > a {
          margin-bottom: ${theme.spacing(2)};
        }
      }

      ${theme.breakpoints.up('md')} {
        padding: ${theme.spacing(2, 0)};
        padding-left: 100px;

        & > li {
          width: calc(33.33% - 20px);
          margin-bottom: ${theme.spacing(3)};
        }

        & > li > a {
          font-size: 1.375rem;
        }
      }

      ${theme.breakpoints.up('lg')} {
        padding-left: 20%;
      }
    }

    &.level-3 {
      ${theme.breakpoints.up('md')} {
        & > li > a {
          padding-bottom: ${theme.spacing(1.5)};
        }
      }
    }
  `
);

function SitemapList({ data, level = 1 }) {
  return (
    <StyledSitemap className={`level-${level}`}>
      {data.map(({ attributes }) => {
        const { id, path, label, children } = attributes;
        const target = path.options.attributes?.target;
        const externalLink = target === '_blank';

        return (
          <MuiListItem key={id}>
            <NextLink
              href={path.url.path}
              prefetch={false}
              passHref={externalLink}
            >
              <a target={target}>{label}</a>
            </NextLink>
            {children?.length > 0 && (
              <SitemapList data={children} level={level + 1} />
            )}
          </MuiListItem>
        );
      })}
    </StyledSitemap>
  );
}

export default function Sitemap(props) {
  const {
    node: { title, fieldHeroImage },
    links,
    breadcrumbs,
    preview,
  } = props;

  return (
    <BasicPage
      preview={preview}
      breadcrumbs={breadcrumbs}
      image={{
        url: fieldHeroImage?.entity?.image?.url,
        title,
      }}
    >
      <Section>
        <SitemapList data={links} />
      </Section>
    </BasicPage>
  );
}

export async function getServerSideProps(context) {
  const { preview = false } = context;
  const blocks = await getContentPathBlocks('/sitemap');
  const links = await getMenu('main');
  const footerLinks = await getMenu('footer');
  const subFooterLinks = await getMenu('footer-sub-menu');
  const data =
    blocks === null
      ? { error: { status: '404' } }
      : { node: blocks.node, links, breadcrumbs: blocks.breadcrumb, preview };

  return {
    props: {
      ...data,
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
