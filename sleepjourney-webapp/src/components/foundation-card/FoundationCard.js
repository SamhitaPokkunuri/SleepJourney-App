import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiTypography from '@mui/material/Typography';

import { Image, Link, Icon } from 'components';

const StyledFoundationCard = styled(MuiBox)(
  ({ theme }) => css`
    &.foundationCard {
      flex: 1;
      padding: ${theme.spacing(0, 2.5, 2.5)};
      text-align: center;
      position: relative;
    }

    .title {
      font-weight: 700;
      margin: ${theme.spacing(1, 0, 0)};
      font-size: 1.375rem;
      line-height: 1.75rem;
      display: flex;
      justify-content: center;
    }

    .description {
      color: ${theme.palette.common.spanishGrey};
      font-size: 1.125rem;

      &:first-of-type {
        margin-top: 0;
      }
    }

    .endIcon {
      color: ${theme.palette.common.red};
      font-size: 30px;
      margin: auto 0 auto auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `
);

export default function FoundationCard(props) {
  const { image, title, description, link } = props;
  const { openAs, url, rel, handleOnClick } = link;
  const { palette } = useTheme();

  return (
    <StyledFoundationCard className="foundationCard">
      {image.toggle && (
        <Image
          alt={image.alt}
          url={image.url}
          width={240}
          imageMask={{
            hasImageMask: true,
            svgImageMask: {
              color: palette.common.lightGrey,
            },
          }}
          marginBottom
        />
      )}
      {title.toggle && (
        <MuiTypography className="title" variant="h4">
          {link.toggle && url ? (
            <Fragment>
              <Link
                backgroundLink
                href={openAs !== 'overlay' ? url : undefined}
                rel={rel}
                target={openAs === 'new-tab' ? '_blank' : undefined}
                onClick={handleOnClick}
              >
                {title.text}
              </Link>
              <span className="endIcon">
                <Icon
                  icon="ChevronRightCircle"
                  iconSet="global"
                  fontSize="small"
                />
              </span>
            </Fragment>
          ) : (
            <span dangerouslySetInnerHTML={{ __html: title.text }} />
          )}
        </MuiTypography>
      )}
      {description.toggle && (
        <MuiTypography className="description" variant="body1">
          <span dangerouslySetInnerHTML={{ __html: description.text }} />
        </MuiTypography>
      )}
    </StyledFoundationCard>
  );
}

FoundationCard.propTypes = {
  toggle: PropTypes.bool,
  image: PropTypes.shape({
    alt: PropTypes.string,
    id: PropTypes.number,
    url: PropTypes.string,
    width: PropTypes.number,
  }),
  title: PropTypes.shape({
    toggle: PropTypes.bool,
    text: PropTypes.string,
  }),
  description: PropTypes.shape({
    toggle: PropTypes.bool,
    text: PropTypes.string,
  }),
  link: PropTypes.shape({
    toggle: PropTypes.bool,
    openAs: PropTypes.string,
    rel: PropTypes.string,
    url: PropTypes.string,
    handleOnClick: PropTypes.func,
  }),
};
