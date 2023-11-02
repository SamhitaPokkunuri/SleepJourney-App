import clsx from 'clsx';
import { useRouter } from 'next/router';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';

import { Card } from 'components';
import useWidthStyles from 'utils/useWidthStyles';

const StyledCardList = styled(MuiBox)(
  ({ theme }) => css`
    .grid {
      margin-bottom: ${theme.spacing(2)};
    }

    ${theme.breakpoints.up('sm')} {
      .gridItem {
        display: flex;
      }
    }
  `
);

let currentPath;
let carouselPaths = [];

export default function CardList(props) {
  const {
    children,
    columns,
    className,
    widthControlExt,
    variation,
    prevSiblingBlock,
  } = props;
  const classNameArr = className ? className.split(' ') : [];
  const isPeopleCard = classNameArr.indexOf('board-committee-card') > -1;
  const isOverlayCarousel = /overlay-carousel/i.test(className);
  const isTwoColMobile = /vdf-two-col-mobile/i.test(className);
  const isFoundationProgCard = /vdf-foundation-programmes/i.test(className);
  const hasOneItem = children?.length === 1;
  const widthStyles = useWidthStyles(widthControlExt);
  const imageAspectRatio = /square-image/i.test(className) ? '1:1' : '16:9';
  // TO DO: get better solution, maybe setting in Drupal - ideally these will be using content list
  const isInheritCols =
    className?.includes('vdf-inherit-col') &&
    prevSiblingBlock?.name === 'vdfblocks/card';
  const isClassOverride = className?.includes('vdf-four-col');
  const isVertical = /vdf-vertical-card/i.test(className);
  const inheritCols = isInheritCols ? prevSiblingBlock?.attributes.columns : 4;

  const router = useRouter();

  if (currentPath !== router?.asPath) {
    currentPath = router?.asPath;
    carouselPaths = [];
  }

  children?.forEach((card) => {
    if (isOverlayCarousel && card.props.link.openAs === 'overlay') {
      const link = card.props.link.url;

      if (carouselPaths.indexOf(link) < 0) {
        carouselPaths.push(link);
      }
    }
  });

  return (
    <StyledCardList sx={{ ...widthStyles }}>
      <MuiGrid container spacing={2} className={clsx({ grid: !hasOneItem })}>
        {children?.map(({ props }, index) => {
          const { anchor, description, image, link, title, countryName } =
            props;

          return (
            <MuiGrid
              className="gridItem"
              key={index}
              item
              xs={isTwoColMobile ? 6 : 12}
              sm={columns === 1 ? 12 : 6}
              md={
                isInheritCols || isClassOverride
                  ? 12 / inheritCols
                  : 12 / columns
              }
            >
              <Card
                anchor={anchor}
                featureCard={
                  columns === 1 &&
                  !isInheritCols &&
                  !isClassOverride &&
                  !isVertical
                }
                showImage={image.toggle}
                showTitle={title.toggle}
                showCountryName={countryName?.toggle}
                showDescription={description.toggle}
                image={{
                  ...image,
                  aspectRatio: imageAspectRatio,
                }}
                noCard={children.length === 1 && !image.toggle && columns === 1}
                title={title.text}
                showLink={link.toggle}
                link={link}
                countryName={countryName?.text}
                description={description.text}
                peopleCard={isPeopleCard}
                carouselPaths={isOverlayCarousel ? carouselPaths : []}
                isCountry={variation === 'countries'}
                isFoundation={variation === 'foundation'}
                isFoundationCountry={
                  variation === 'countries' &&
                  /is-foundation-country/i.test(className)
                }
                isFoundationProg={isFoundationProgCard}
              />
            </MuiGrid>
          );
        })}
      </MuiGrid>
    </StyledCardList>
  );
}
