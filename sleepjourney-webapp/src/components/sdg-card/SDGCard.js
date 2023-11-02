import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiTypography from '@mui/material/Typography';

import { useOverlayRoute } from 'hooks/useOverlayRoute';
import { Link, NextImage, Icon } from 'components';

const StyledSdgCard = styled(MuiBox)(
  ({ theme }) => css`
    display: flex;
    flex: 1;
    padding: 24px;
    box-shadow: ${theme.cards.boxShadow};
    position: relative;
    background: ${theme.palette.common.white};
    color: ${theme.palette.common.darkGrey};

    ${theme.breakpoints.up('md')} {
      transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0ms;

      &:hover {
        transform: scale(1.03);
        box-shadow: ${theme.cards.boxShadowHover};
      }
    }

    .media {
      background: ${theme.palette.common.shadeGrey};
      height: 122px;
      width: 122px;
      position: relative;
    }

    .text {
      flex: 1;
      padding-left: ${theme.spacing(2)};

      &.centered {
        margin: auto;
      }
    }

    .title {
      font-weight: 900;
      font-size: 1.25rem;
      margin: ${theme.spacing(0, 0, 1)};
    }

    .link {
      display: flex;
      margin: auto;
    }

    .description {
      margin: 0;

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

export default function SdgCard(props) {
  const {
    image: { src },
    title,
    description,
    link,
    link: { target, url },
    chevron,
    hideDescription,
  } = props;

  const { handleOverlayClick } = useOverlayRoute();

  return (
    <StyledSdgCard>
      <MuiBox className="media">
        {src && (
          <NextImage src={src} layout="fill" objectFit="cover" alt={title} />
        )}
      </MuiBox>
      <MuiBox
        className={clsx('text', {
          centered: chevron,
        })}
      >
        {title && (
          <MuiTypography className="title" variant="h4">
            {url ? (
              <div className="link">
                <Link
                  backgroundLink
                  href={url}
                  target={target !== 'overlay' ? target : undefined}
                  rel={target === '_blank' ? 'noopener' : undefined}
                  onClick={(e) => {
                    handleOverlayClick(e, target === 'overlay', link.url);
                  }}
                  icon={'OverlayInfo'}
                  showIcon={target === 'overlay'}
                >
                  {title}
                </Link>
                {chevron && (
                  <span className="endIcon">
                    <Icon
                      icon="ChevronRightCircle"
                      iconSet="global"
                      fontSize="inherit"
                    />
                  </span>
                )}
              </div>
            ) : (
              title
            )}
          </MuiTypography>
        )}
        {description && !hideDescription && (
          <MuiTypography className="description">{description}</MuiTypography>
        )}
      </MuiBox>
    </StyledSdgCard>
  );
}

SdgCard.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string,
  }),
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.shape({
    target: PropTypes.oneOf(['overlay', '_blank', '_self']),
    url: PropTypes.string,
  }),
};
