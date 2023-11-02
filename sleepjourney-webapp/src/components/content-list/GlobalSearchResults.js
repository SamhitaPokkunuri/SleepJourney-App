import { styled, css } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import MuiBox from '@mui/material/Box';
import MuiTypography from '@mui/material/Typography';

import { Card, Link } from 'components';
import data from './gap/gapSearch';
import keyword from './gap/keywords';

const StyledGlobalSearchResults = styled(MuiBox)(
  ({ theme }) => css`
    .list {
      list-style: none;
      padding-left: 0;
    }

    .resultsCount {
      border-top: 1px solid #ccc;
      color: #999;
      padding-top: ${theme.spacing(1.2)};
      margin-bottom: ${theme.spacing(2)};
    }

    .listItem {
      display: list-item;

      &.card + li:not(.card) {
        margin-top: 20px;
      }
    }

    .title {
      margin-top: 0;
      margin-bottom: ${theme.spacing(0.5)};

      ${theme.breakpoints.up('sm')} {
        margin-bottom: ${theme.spacing(1)};
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    .description {
      &,
      &:first-of-type {
        margin-top: 0;
      }
    }
  `
);

export default function ContentList(props) {
  const { posts, loading } = props;
  const titleMaxLength = 68;
  const descriptionMaxLength = 235;

  const jsonSearch = (keyword, val = '') => {
    const match = [];
    const words = val.split(' ');

    for (const [key, value] of Object.entries(keyword)) {
      words.forEach((word) => {
        // Make search case insensitive
        if (word.length > 1) {
          const regex = RegExp(word, 'i');
          // if value contains searched word, return document
          if (regex.test(value) && !match.find((a) => a.category === key)) {
            match.push(data.documents[key]);
          }
        }
      });
    }

    return match;
  };

  const resl = posts.search ? jsonSearch(keyword, posts.search) : [];

  if (!posts.documents?.find((a) => a.gapSearch === true)) {
    posts.documents?.unshift(...resl);
  }

  const totalCount = posts.result_count + resl.length || 0;

  return (
    <StyledGlobalSearchResults>
      <MuiTypography className="resultsCount">
        {`Returned ${totalCount} ${totalCount === 1 ? 'result' : 'results'}`}
      </MuiTypography>
      {loading && 'Loading...'}
      {!loading && posts.documents?.length < 1 && 'No results found'}
      {!loading && posts.documents?.length > 0 && (
        <MuiGrid
          container
          spacing={2}
          className="list"
          component="ul"
          aria-label="button list"
        >
          {posts.documents.map((child) => {
            if (child.gapSearch) {
              return (
                <MuiGrid
                  key={child.id}
                  component="li"
                  className="listItem card"
                  item
                  xs={12}
                  sm={6}
                  md={12 / resl.length}
                >
                  <Card
                    key={`${child.id}-gap`}
                    firstCard={resl.length < 2}
                    singleColumn={false}
                    showImage={true}
                    showDate={false}
                    showCategory={false}
                    showTitle={true}
                    showDescription={true}
                    showLink={true}
                    image={{
                      url: child.thumbnailImage,
                      aspectRatio: '16:9',
                    }}
                    title={child.title}
                    link={child.url}
                    description={child.description}
                  />
                </MuiGrid>
              );
            }
            return (
              <MuiGrid
                key={child.id}
                component="li"
                item
                xs={12}
                className="listItem"
                onClick={(e) => {
                  e.preventDefault;
                }}
              >
                <MuiTypography className="title" variant="h4">
                  {child.url ? (
                    <Link
                      href={child.url}
                      target={
                        child.type === 'web_stories' ? '_blank' : undefined
                      }
                    >
                      {child?.title?.length > titleMaxLength
                        ? `${child.title.substring(0, titleMaxLength)}...`
                        : child.title}
                    </Link>
                  ) : (
                    child.title
                  )}
                </MuiTypography>
                {/* TODO: Add BreadCrumbs https://www.drupal.org/docs/8/modules/search-api/developer-documentation/create-custom-fields-using-a-custom-processor */}
                <MuiTypography className="description" variant="body1">
                  {child?.description?.length > descriptionMaxLength
                    ? `${child.description.substring(
                        0,
                        descriptionMaxLength
                      )}...`
                    : child.description}
                </MuiTypography>
              </MuiGrid>
            );
          })}
        </MuiGrid>
      )}
    </StyledGlobalSearchResults>
  );
}
