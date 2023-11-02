import { Fragment } from 'react';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';
import ReadingTime, {
  getReadingTimeText,
} from 'components/reading-time/ReadingTime';

import {
  Header,
  Footer,
  Main,
  Meta,
  PreviewBar,
  Banner,
  Breadcrumbs,
  DateSocialBar,
  Tags,
  RelatedArticles,
} from 'components';
import ScrollingIndicator from '../scrolling-indicator/ScrollingIndicator';

const StyledArticleHeader = styled(MuiBox)(
  ({ theme }) => css`
    padding: ${theme.spacing(0, 1.6)};

    ${theme.breakpoints.up(480)} {
      padding-right: ${theme.spacing(2.4)};
      padding-left: ${theme.spacing(2.4)};
    }

    ${theme.breakpoints.up('md')} {
      padding-right: ${theme.spacing(3.2)};
      padding-left: ${theme.spacing(3.2)};
    }

    ${theme.breakpoints.up('xl')} {
      padding-right: ${theme.spacing(4.8)};
      padding-left: ${theme.spacing(4.8)};
    }

    ${theme.breakpoints.up('xxl')} {
      padding-right: ${theme.spacing(6)};
      padding-left: ${theme.spacing(6)};
    }

    & .articleHeaderContainer {
      padding-top: ${theme.spacing(2)};
      margin: 0 auto;

      ${theme.breakpoints.up('sm')} {
        padding-top: ${theme.spacing(4)};
        max-width: ${theme.containers.values.sm}px;
      }

      ${theme.breakpoints.up('md')} {
        padding-top: ${theme.spacing(6)};
        max-width: ${theme.containers.values.md}px;
      }

      ${theme.breakpoints.up('xxl')} {
        max-width: ${theme.containers.values.lg}px;
      }
    }

    & .innerArticleHeader {
      ${theme.breakpoints.up('sm')} {
        margin: 0 auto 0 0;
        width: 83.33%;
      }
    }
  `
);

const StyledTags = styled(MuiBox)(
  ({ theme }) => css`
    padding: ${theme.spacing(0, 1.6)};
    margin: 0 auto 40px;

    ${theme.breakpoints.up('sm')} {
      max-width: ${theme.containers.values.sm}px;
      margin-bottom: 60px;
      padding: ${theme.spacing(0, 2.4)};
    }

    ${theme.breakpoints.up('md')} {
      max-width: ${theme.containers.values.md}px;
      margin-bottom: 100px;
      padding: 0;
    }

    & .tagsContainer {
      ${theme.breakpoints.up('sm')} {
        margin: 0 auto 0 0;
        max-width: 83.33%;
      }

      ${theme.breakpoints.down('lg')} {
        margin: auto;
      }

      ${theme.breakpoints.up('lg')} {
        max-width: 66.66%;
      }
    }
  `
);

export default function BasicArticle(props) {
  const {
    preview,
    children,
    postID,
    postType,
    image,
    breadcrumbs,
    showDateCat,
    category,
    categoryID,
    tags,
    date,
    title,
    description,
    canonical,
    categoryColor,
  } = props;

  const hasImage = image && image.url;
  const readingTimeText = getReadingTimeText(children);

  return (
    <Fragment>
      <Meta />
      {preview && <PreviewBar />}
      <Header preview={preview} />
      <Main preview={preview}>
        <Banner title={image.title} media={{ type: 'image', url: image.url }} />
        <ScrollingIndicator
          position="sticky"
          marginTop="-5px"
          sx={{ top: { xs: 48, sm: 60, md: 72 } }}
        />
        <Breadcrumbs breadcrumbs={breadcrumbs || []} article={!hasImage} />
        <StyledArticleHeader>
          <MuiContainer className="articleHeaderContainer">
            <MuiBox className="innerArticleHeader">
              <DateSocialBar
                email
                facebook
                linkedin
                twitter
                type="fill"
                fontSize="large"
                showDate={!hasImage || showDateCat}
                date={date}
                showCategory={!hasImage || showDateCat}
                category={category}
                showShareIcons
                title={title}
                description={description}
                canonical={canonical}
                collapsed={false}
                categoryColor={categoryColor}
              />
              <ReadingTime text={readingTimeText} />
            </MuiBox>
          </MuiContainer>
        </StyledArticleHeader>
        <MuiBox>{children}</MuiBox>
        {tags?.length > 0 && (
          <StyledTags>
            <MuiContainer className="tagsContainer">
              <Tags data={tags.map((tag) => tag.entity?.name)} />
            </MuiContainer>
          </StyledTags>
        )}
        {postType === 'basic_article' && (
          <RelatedArticles postID={postID} categoryID={categoryID} />
        )}
      </Main>
      <Footer />
    </Fragment>
  );
}
