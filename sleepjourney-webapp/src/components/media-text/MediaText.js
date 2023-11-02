import PropTypes from 'prop-types';
import clsx from 'clsx';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme, styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiTypography from '@mui/material/Typography';

import { Column, Columns, Image } from 'components';
import reverseDirection from 'utils/reverseDirection';

const columnsWidths = {
  half: [50, 50],
  'seven-five': [70, 30],
  'eight-four': [75, 25],
};

const StyledMediaText = styled(MuiBox, {
  shouldForwardProp: (prop) => /(desktop|padding)/.test(prop) === false,
})(
  ({ theme, desktop, padding }) => css`
    &.blockPadding {
      padding-top: ${padding.top ? theme.spacing(3) : 0};
      padding-bottom: ${padding.bottom ? theme.spacing(3) : 0};

      ${theme.breakpoints.up('sm')} {
        padding-top: ${padding.top ? theme.spacing(10) : 0};
        padding-bottom: ${padding.bottom ? theme.spacing(10) : 0};
      }
    }

    &.alignTextCenterMob {
      & .MuiTypography-root {
        ${theme.breakpoints.down('sm')} {
          text-align: center;
        }
      }
    }

    .alignCenter {
      & .MuiTypography-root {
        ${theme.breakpoints.down('sm')} {
          text-align: center;
        }
      }
    }

    .contentContainer {
      & > :first-of-type:not(style):not(:first-of-type ~ *),
      & > style + * {
        margin-top: 0;
      }

      ${theme.breakpoints.up('sm')} {
        padding-${desktop}: 4px;
      }

      ${theme.breakpoints.up('md')} {
        padding-${desktop}: 8px;
      }

      ${theme.breakpoints.up('xl')} {
        padding-${desktop}: 32px;
      }
    }

    .squareImageContainer {
      margin: 0 auto;
      width: 100%;
      max-width: 100%;

      & > :last-child {
        margin-bottom: 0;
      }

      ${theme.breakpoints.up(400)} {
        max-width: 400px;
      }

      ${theme.breakpoints.up('sm')} {
        max-width: 100%;
        padding-${reverseDirection(desktop)}: 4px;
      }

      ${theme.breakpoints.up('md')} {
        padding-${reverseDirection(desktop)}: 8px;
      }

      ${theme.breakpoints.up('xl')} {
        padding-${reverseDirection(desktop)}: 32px;
      }
    }

    .roundImageContainer {
      width: 100%;

      ${theme.breakpoints.up('sm')} {
        padding-${reverseDirection(desktop)}: ${100 / 12}%;
      }
    }

    .caption {
      margin-top: 5px;
    }
  `
);

function MediaText(props) {
  const {
    align,
    anchor,
    badge = {},
    caption,
    children,
    className,
    columns,
    image = {},
    imageMask = {},
    mediaPosition = {},
    padding = {},
  } = props;

  const isRounded = /is-style-rounded/.test(className);
  const isCenterMob = /vdf-center-align-mobile/.test(className);
  const hideImageMobile = /vdf-hide-image-mobile/.test(className);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const hideImage = hideImageMobile && isMobile;
  const isSmallRoundMedia = image.size === 'small' && isRounded;

  return (
    <StyledMediaText
      id={anchor}
      className={clsx({
        blockPadding: padding.top || padding.bottom,
        alignTextCenterMob: isCenterMob,
      })}
      desktop={mediaPosition.desktop}
      padding={padding}
    >
      <Columns verticalAlignment={align}>
        <Column
          key="media"
          width={columnsWidths[columns][1]}
          order={
            mediaPosition.desktop === 'left' ||
            (isMobile && mediaPosition.mobile === 'top')
              ? 1
              : 2
          }
        >
          {image.url && !hideImage && (
            <MuiBox
              className={clsx({
                roundImageContainer: isRounded,
                squareImageContainer: !isRounded,
              })}
            >
              <Image
                alt={image.alt}
                url={image.url}
                className={className}
                badge={badge}
                imageMask={imageMask}
                sizeSlug={!isRounded ? 'full_width' : undefined}
                mediaSize={image.size}
                align={
                  isMobile
                    ? 'center'
                    : reverseDirection(mediaPosition.desktop, isSmallRoundMedia)
                }
                width={image.width}
                height={image.height}
                marginTop={isMobile && mediaPosition.mobile === 'bottom'}
                marginBottom={false}
              />
              {caption && (
                <MuiTypography variant="body2" gutterBottom className="caption">
                  {caption}
                </MuiTypography>
              )}
            </MuiBox>
          )}
        </Column>
        <Column
          key="text"
          width={columnsWidths[columns][0]}
          order={
            mediaPosition.desktop === 'left' ||
            (isMobile && mediaPosition.mobile === 'top')
              ? 2
              : 1
          }
        >
          <MuiBox className="contentContainer">{children}</MuiBox>
        </Column>
      </Columns>
    </StyledMediaText>
  );
}

MediaText.propTypes = {
  /**
   * Sets the vetical alignment of the columns.
   */
  align: PropTypes.oneOf(['top', 'center', 'bottom']),
  /**
   * @ignore
   */
  anchor: PropTypes.string,
  /**
   * Displays a badge over the image component.
   */
  badge: PropTypes.shape({
    color: PropTypes.string,
    hasImageBadge: PropTypes.bool,
    hideImageMobile: PropTypes.bool,
  }),
  /**
   * Sets a caption for the image.
   */
  caption: PropTypes.string,
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The column width distribution.
   */
  columns: PropTypes.oneOf(['half', 'seven-five', 'eight-four']),
  /**
   * The image component to display.
   */
  image: PropTypes.shape({
    alt: PropTypes.string,
    id: PropTypes.number,
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    url: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
  }),
  /**
   * A mask to display over the image component.
   */
  imageMask: PropTypes.shape({
    hasImageMask: PropTypes.bool,
    svgImageMask: PropTypes.shape({
      color: PropTypes.string,
    }),
  }),
  /**
   * The responsive position of the component.
   */
  mediaPosition: PropTypes.shape({
    desktop: PropTypes.oneOf(['left', 'right']),
    mobile: PropTypes.oneOf(['top', 'bottom']),
  }),
  /**
   * Adds padding to the top and bottom of the component.
   */
  padding: PropTypes.shape({
    top: PropTypes.bool,
    bottom: PropTypes.bool,
  }),
};

MediaText.defaultProps = {
  align: 'center',
  columns: 'half',
};

export default MediaText;
