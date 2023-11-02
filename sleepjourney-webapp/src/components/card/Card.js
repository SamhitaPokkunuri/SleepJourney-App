import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import MuiCardContent from '@mui/material/CardContent';
import MuiCardMedia from '@mui/material/CardMedia';
import MuiTypography from '@mui/material/Typography';

import {
  Link,
  DateSocialBar,
  NextImage,
  Image,
  Tags,
  FoundationCard,
  FoundationProgramme,
} from 'components';
import { useOverlayRoute } from 'hooks/useOverlayRoute';
import addAssetPrefix from 'utils/addAssetPrefix';
import addSiteURLPrefix from 'utils/addSiteURLPrefix';
import ReadingTime, {
  getReadingTimeTextHtml,
} from 'components/reading-time/ReadingTime';

const linkIcons = {
  'current-tab': 'ChevronRightCircle',
  'new-tab': 'PopOut',
  overlay: 'OverlayInfoCircle',
  undefined: 'ChevronRightCircle',
};

const StyledCard = styled(MuiCard, {
  shouldForwardProp: (prop) => /(peopleCard|ratio)/.test(prop) === false,
})(
  ({ theme, peopleCard, ratio }) => css`
    position: relative;
    border-radius: ${theme.cards.borderRadius};
    box-shadow: ${theme.cards.boxShadow};

    ${theme.breakpoints.down('sm')} {
      max-width: 440px;
      margin: auto;
    }

    ${theme.breakpoints.up('sm')} {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
    }

    &.animate {
      ${theme.breakpoints.up('md')} {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0ms;

        &:hover {
          transform: scale(1.03);
          box-shadow: ${theme.cards.boxShadowHover};
        }
      }
    }

    &.firstCard {
      ${theme.breakpoints.up('sm')} {
        flex-direction: row;

        .media {
          padding: 0;
          min-height: 385px;
          height: auto;
          width: 50%;
        }

        .content {
          border-top: 0;
          border-left: ${theme.cards.border};
        }
      }

      ${theme.breakpoints.up('md')} {
        .media {
          width: 66.66%;
        }

        .content {
          padding: ${theme.spacing(6, 3)};
        }
      }
    }

    &.featureCard {
      ${theme.breakpoints.up('md')} {
        .media {
          width: 66.66%;
        }
      }
    }

    &.singleColumn {
      ${theme.breakpoints.up('sm')} {
        display: flex;
        flex-direction: row;

        .media {
          padding: 0;
          height: auto;
          width: 228px;
        }

        .content {
          min-height: 240px;
        }

        .title {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .description {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }

      ${theme.breakpoints.up('md')} {
        .media {
          width: 280px;
        }

        .content {
          min-height: 224px;
        }

        .description {
          -webkit-line-clamp: 2;
        }
      }
    }

    &.country {
      .title {
        ${theme.breakpoints.up('sm')} {
          font-size: 1.5rem;
          line-height: 1.875rem;
        }
      }

      .media {
        width: 33px;
        height: 33px;
        background-color: transparent;
        padding-bottom: 0;
        margin-right: ${theme.spacing(1)};

        ${theme.breakpoints.up('sm')} {
          width: 40px;
          height: 40px;
        }
      }

      .content {
        border-top: 0;

        ${theme.breakpoints.up('sm')} {
          padding: ${theme.spacing(2, 3)};
        }
      }

      .countryName .title {
        margin-top: 0;
      }
    }

    &.foundationCountry {
      background: none;
      box-shadow: none;
      border-radius: 0;
      overflow: visible;
      margin-bottom: ${theme.spacing(1)};
      padding-right: ${theme.spacing(1)};

      .content {
        padding: 0;
        border-top: 0;
      }

      .countryName {
        align-items: center;

        .description {
          font-weight: 700;
          font-size: 1rem !important;

          > a::after {
            display: none;
          }
        }
      }

      .media {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        box-shadow: rgb(0 0 0 / 40%) 0px 0px 6px 0px;
        padding: 0;
      }
    }

    &.ctaCard {
      box-shadow: none;
      background-color: transparent;

      .content {
        padding: 0;
        min-height: auto;
        border-top: 0;
        border-left: 0;
        color: ${theme.palette.common.white};
      }
    }

    .media {
      height: 0;
      background-color: ${theme.palette.common.shadeGrey};
      position: relative;
      overflow: hidden;
      padding-bottom: ${(ratio[1] / ratio[0]) * 100}%;

      ${theme.breakpoints.up('sm')} {
        flex-shrink: 0;
      }
    }

    .content {
      width: 100%;
      padding: ${theme.spacing(2)};
      border-top: ${theme.cards.border};

      > :last-child {
        margin-bottom: 0;
      }

      ${theme.breakpoints.up('sm')} {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        padding: ${theme.spacing(3)};
      }
    }

    .contentPadding {
      ${theme.breakpoints.up('md')} {
        padding-top: ${theme.spacing(4)};
        padding-bottom: ${theme.spacing(4)};
      }
    }

    .title {
      margin-top: 0;
      margin-bottom: ${theme.spacing(1)};
      font-size: ${peopleCard ? '20px' : undefined};
      line-height: ${peopleCard ? '28px' : undefined};
      font-weight: ${!peopleCard ? 900 : undefined};

      ${theme.breakpoints.up('sm')} {
        margin-bottom: ${theme.spacing(1)};
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    .description {
      margin-bottom: ${theme.spacing(1.5)};
      font-size: ${peopleCard ? '18px' : '1rem'};
      line-height: ${peopleCard ? '24px' : '1.25rem'};

      &,
      &:first-of-type {
        margin-top: 0;
      }

      ${theme.breakpoints.up('sm')} {
        margin-bottom: ${theme.spacing(2)};
        font-size: ${peopleCard ? '18px' : '1.125rem'};
        line-height: ${peopleCard ? '24px' : '1.375rem'};
      }

      ${theme.breakpoints.up('md')} {
        font-size: ${peopleCard ? '18px' : '1.25rem'};
        line-height: ${peopleCard ? '24px' : '1.5rem'};
      }
    }

    .countryName {
      display: flex;
      align-items: center;
      margin-bottom: ${theme.spacing(2)};

      .title {
        flex: 1;
      }

      .description {
        margin-bottom: 0;
      }
    }
  `
);

function Card(props) {
  const {
    anchor,
    firstCard,
    noCard,
    featureCard,
    singleColumn,
    showImage,
    showDate,
    showCategory,
    showCountryName,
    showTitle,
    showDescription,
    showShareIcons,
    showLink,
    showTags,
    tags,
    image,
    date,
    category,
    title,
    link,
    countryName,
    description,
    peopleCard,
    categoryColor,
    categoryAlias,
    isCountry,
    isFoundation,
    isFoundationCountry,
    isFoundationProg,
    body,
  } = props;

  const ratio = image.aspectRatio.split(':');

  const { handleOverlayClick } = useOverlayRoute();

  const handleOnClick = (e) => {
    if (link?.openAs === 'overlay') {
      handleOverlayClick(e, link?.openAs === 'overlay', link.url);
    }

    // does url start with hash
    if (/^#/.test(link?.url)) {
      const element = document.querySelector(link.url);

      if (element) {
        e.preventDefault();
        window.scrollTo({
          top: element.offsetTop - 60,
          behavior: 'smooth',
        });
      }
    }
  };

  const showDateSocialBar =
    ((showDate && date) || (showCategory && category) || showShareIcons) &&
    !isCountry &&
    !isFoundationCountry;

  const icon = linkIcons[link.openAs];

  if (isFoundation) {
    return (
      <FoundationCard
        image={image}
        title={{
          toggle: showTitle,
          text: title,
        }}
        description={{
          toggle: showDescription,
          text: description,
        }}
        link={{
          ...link,
          handleOnClick,
        }}
      />
    );
  }

  if (isFoundationProg) {
    return (
      <FoundationProgramme
        image={image}
        title={{
          toggle: showTitle,
          text: title,
        }}
        link={{
          ...link,
          handleOnClick,
        }}
      />
    );
  }

  const readingTimeText = getReadingTimeTextHtml(body);

  return (
    <>
      <StyledCard
        id={anchor}
        className={clsx({
          firstCard: firstCard || featureCard,
          featureCard: featureCard,
          ctaCard: noCard,
          singleColumn: singleColumn,
          country: isCountry,
          foundationCountry: isFoundationCountry,
          animate: !isFoundationCountry && !noCard,
          foundationProg: isFoundationProg,
        })}
        peopleCard={peopleCard}
        ratio={ratio}
      >
        {showImage && !isCountry && (
          <MuiCardMedia className="media">
            <NextImage
              src={addAssetPrefix(image.url)}
              layout="fill"
              objectFit="cover"
              alt={title}
            />
          </MuiCardMedia>
        )}
        <MuiCardContent
          className={clsx('content', {
            contentPadding:
              (firstCard || featureCard) && !showDate && !showCategory,
          })}
        >
          {showDateSocialBar && (
            <DateSocialBar
              showDate={showDate}
              date={date}
              showCategory={showCategory}
              category={category}
              categoryColor={categoryColor}
              categoryAlias={categoryAlias}
              showShareIcons={showShareIcons}
              collapsed
              facebook
              linkedin
              twitter
              email
              fontSize="small"
              title={title}
              description={description}
              canonical={addSiteURLPrefix(link.url)}
            />
          )}
          {showTitle && (
            <MuiTypography className="title" variant="h4">
              {link.url && showLink ? (
                <Link
                  backgroundLink
                  href={link.url}
                  rel={link.rel || undefined}
                  target={link.openAs === 'new-tab' ? '_blank' : undefined}
                  onClick={handleOnClick}
                  animate={isFoundationCountry || noCard}
                  greyCircle={noCard}
                  icon={icon}
                  iconSize={/(Circle)/.test(icon) ? 'extra-small' : 'small'}
                  showIcon
                >
                  {title}
                </Link>
              ) : (
                <span dangerouslySetInnerHTML={{ __html: title }} />
              )}
            </MuiTypography>
          )}
          {body && <ReadingTime text={readingTimeText} />}
          {showDescription && (
            <MuiTypography className="description" variant="body1">
              {link.url && !showTitle && showLink ? (
                <Link
                  backgroundLink
                  href={link.url}
                  rel={link.rel}
                  target={link.openAs === 'new-tab' ? '_blank' : undefined}
                  onClick={handleOnClick}
                  animate={isFoundationCountry}
                  icon={icon}
                  iconSize={/(Circle)/.test(icon) ? 'extra-small' : 'small'}
                  showIcon
                >
                  {description}
                </Link>
              ) : (
                <span dangerouslySetInnerHTML={{ __html: description }} />
              )}
            </MuiTypography>
          )}
          {isCountry && (
            <div className="countryName">
              {showImage && image.url && (
                <MuiCardMedia className="media">
                  <Image
                    url={addAssetPrefix(image.url)}
                    alt={title || countryName}
                    marginBottom={false}
                    className="is-style-rounded"
                  />
                </MuiCardMedia>
              )}
              {showCountryName && (
                <MuiTypography
                  className={clsx({
                    description: showTitle || isFoundationCountry,
                    title: !showTitle && !isFoundationCountry,
                  })}
                  variant={!showTitle && !isFoundationCountry ? 'h4' : 'body1'}
                >
                  {link.url && !showTitle && !showDescription && showLink ? (
                    <Link
                      backgroundLink
                      href={link.url}
                      rel={link.rel}
                      target={link.openAs === 'new-tab' ? '_blank' : undefined}
                      onClick={handleOnClick}
                      animate={isFoundationCountry}
                      icon={icon}
                      iconSize={/(Circle)/.test(icon) ? 'extra-small' : 'small'}
                      showIcon
                    >
                      {countryName}
                    </Link>
                  ) : (
                    <span dangerouslySetInnerHTML={{ __html: countryName }} />
                  )}
                </MuiTypography>
              )}
            </div>
          )}
          {showTags && tags?.length > 0 && <Tags data={tags} />}
        </MuiCardContent>
      </StyledCard>
    </>
  );
}

Card.defaultProps = {
  featureCard: false,
  firstCard: false,
  showCategory: false,
  showDate: false,
  showDescription: false,
  showImage: false,
  showLink: false,
  showShareIcons: false,
  showTags: false,
  showTitle: false,
  singleColumn: false,
};

Card.propTypes = {
  /**
   * The category of the article.
   */
  category: PropTypes.string,
  /**
   * Links to the category news page.
   */
  categoryAlias: PropTypes.string,
  /**
   * The color for the category.
   */
  categoryColor: PropTypes.string,
  /**
   * The date of the article.
   */
  date: PropTypes.string,
  /**
   * The description of the article.
   */
  description: PropTypes.string,
  /**
   * Sets the orientation of the card to horizontal.
   */
  featureCard: PropTypes.bool,
  /**
   * Sets the orientation of the card to horizontal.
   */
  firstCard: PropTypes.bool,
  /**
   * The image of the article.
   */
  image: PropTypes.object,
  /**
   * Links to the full article.
   */
  link: PropTypes.object,
  /**
   * Displays the category.
   */
  showCategory: PropTypes.bool,
  /**
   * Displays the date.
   */
  showDate: PropTypes.bool,
  /**
   * Displays the description.
   */
  showDescription: PropTypes.bool,
  /**
   * Displays the image.
   */
  showImage: PropTypes.bool,
  /**
   * Adds the link to the title.
   */
  showLink: PropTypes.bool,
  /**
   * Displays the share icons.
   */
  showShareIcons: PropTypes.bool,
  /**
   * Displays the tags.
   */
  showTags: PropTypes.bool,
  /**
   * Displays the title.
   */
  showTitle: PropTypes.bool,
  /**
   * Sets the orientation of the card to horizontal.
   */
  singleColumn: PropTypes.bool,
  /**
   * The tags associated with the article.
   */
  tags: PropTypes.array,
  /**
   * The title of the article.
   */
  title: PropTypes.string,
};

export default Card;
