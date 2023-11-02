import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';

import { Link, Heading } from 'components';
import getColor from 'utils/getColor';

const StyledIconFeature = styled(MuiGrid, {
  shouldForwardProp: (prop) =>
    /(customColors|extraPadding|marginBottom|noSpacing)/.test(prop) === false,
})(
  ({ theme, customColors, extraPadding, marginBottom, noSpacing }) => css`
    padding: 0;
    background: ${customColors.background};
    color: ${customColors.text};

    ${theme.breakpoints.down('md')} {
      margin-bottom: ${marginBottom ? theme.spacing(2) : 0};
    }

    &.divider {
      ${theme.breakpoints.between('sm', 'md')} {
        &:nth-of-type(2n) {
          border-left: 1px solid ${theme.palette.common.spanishGrey};
        }
      }

      ${theme.breakpoints.up('md')} {
        &:nth-of-type(n + 2) {
          border-left: 1px solid ${theme.palette.common.spanishGrey};
        }
      }
    }

    &.rowIcon {
      ${theme.breakpoints.up('sm')} {
        margin-right: auto;

        .innerWrapper {
          display: flex;
          max-width: 510px;
          padding: 16px 0;

          .innerIcon {
            margin-right: ${theme.spacing(3)};
          }

          p {
            text-align: left;
          }
        }
      }
    }

    &.firstRowIcon {
      ${theme.breakpoints.up('sm')} {
        .innerWrapper {
          padding-top: ${theme.spacing(0)};
        }
      }
    }

    &.card {
      margin-bottom: 0;
      display: flex;

      .innerWrapper {
        display: flex;
        flex: 1;
        margin: 0;
        align-items: center;
        max-width: none;
        flex-direction: column;
        padding: ${extraPadding ? '40px 20px' : '20px'};
        border-radius: ${theme.cards.borderRadius};
        box-shadow: ${theme.cards.boxShadow};

        ${theme.breakpoints.up('sm')} {
          padding: ${extraPadding ? '60px 30px' : '30px'};
        }

        .innerContent {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          justify-content: start;

          p {
            margin-top: 0;
          }

          .button {
            margin-top: auto;
          }
        }

        &.row {
          flex-direction: row;

          ${theme.breakpoints.up('sm')} {
            padding: 36px 30px;
          }

          .innerIcon {
            margin: 0 20px 0 0;
          }
        }
      }
    }

    .innerWrapper {
      max-width: ${noSpacing ? '420px' : '360px'};
      margin: 0 auto;
      position: relative;
      padding: ${extraPadding ? '60px 16px' : '0'};

      &.row {
        margin-bottom: 0;
      }

      ${theme.breakpoints.up('md')} {
        margin-bottom: 20px;
      }
    }

    .innerIcon {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }

    .innerContent {
      & > :first-of-type:not(style):not(:first-of-type ~ *),
      & > style + * {
        margin-top: 0;
      }

      & > :last-child {
        margin-bottom: 0;
      }
    }
  `
);

export default function IconFeature(props) {
  const {
    border,
    children,
    className,
    columns,
    contentAlign,
    customColors,
    dropShadow,
    extraPadding,
    first,
    isRows,
    link,
    marginBottom,
    noSpacing,
  } = props;

  return (
    <StyledIconFeature
      item
      xs={12}
      sm={columns === 1 || isRows ? 12 : 6}
      md={isRows ? 12 : 12 / columns}
      className={clsx(className, {
        divider: border,
        rowIcon: isRows,
        firstRowIcon: isRows && first,
        card: dropShadow,
      })}
      customColors={customColors}
      extraPadding={extraPadding}
      marginBottom={marginBottom}
      noSpacing={noSpacing}
    >
      <div
        className={clsx('innerWrapper', {
          row: contentAlign === 'left',
        })}
      >
        <div className="innerIcon">
          {children
            .filter((item) => item.props.name === 'vdfblocks/icon')
            .map((child) => ({
              ...child,
              props: {
                ...child.props,
                fontSize: child.props.fontSize || 'large',
              },
            }))}
        </div>
        <div className="innerContent">
          {children
            .filter((item) => item.props.name !== 'vdfblocks/icon')
            .map((item) => {
              if (item.props.name === 'core/heading') {
                return (
                  item.props.content && (
                    <Heading
                      key={item.key}
                      {...item.props}
                      align={contentAlign}
                      variant={`h${item.props.level}`}
                      color={getColor(item.props.customColors.text)}
                    >
                      {link.toggle ? (
                        <Link
                          href={link.url}
                          backgroundLink
                          animate={link.openAs !== 'new-tab'}
                          icon={
                            link.openAs === 'new-tab'
                              ? 'PopOut'
                              : 'ChevronRightCircle'
                          }
                          target={
                            link.openAs === 'new-tab' ? '_blank' : undefined
                          }
                          showIcon
                        >
                          {item.props.content}
                        </Link>
                      ) : (
                        item.props.content
                      )}
                    </Heading>
                  )
                );
              }

              if (item.props.name === 'core/paragraph') {
                return {
                  ...item,
                  props: {
                    ...item.props,
                    align: contentAlign,
                  },
                };
              }

              return item;
            })}
        </div>
      </div>
    </StyledIconFeature>
  );
}

IconFeature.defaultProps = {
  customColors: {
    background: '',
    text: '',
  },
};

IconFeature.propTypes = {
  /**
   * Adds a vertical dividing border.
   */
  border: PropTypes.bool,
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Adds a className to the root component.
   */
  className: PropTypes.string,
  /**
   * The number of columns to display.
   */
  columns: PropTypes.number,
  /**
   * The alignment of the content.
   */
  contentAlign: PropTypes.oneOf(['left', 'center', 'right']),
  /**
   * The user determined background and text colors.
   */
  customColors: PropTypes.shape({
    background: PropTypes.string,
    text: PropTypes.string,
  }),
  /**
   * Used to add a drop shadow.
   */
  dropShadow: PropTypes.bool,
  /**
   * Used to add extra padding to the top and bottom of the component.
   */
  extraPadding: PropTypes.bool,
  /**
   * Used to identify the first item in the list.
   */
  first: PropTypes.bool,
  /**
   * Used to determine the orientation of the grid.
   */
  isRows: PropTypes.bool,
  /**
   * The link that is used for the whole clickable area.
   */
  link: PropTypes.shape({
    toggle: PropTypes.bool,
    url: PropTypes.string,
    openAs: PropTypes.string,
    rel: PropTypes.string,
  }),
  /**
   * Adds margin to the bottom of the component.
   */
  marginBottom: PropTypes.bool,
  /**
   * Removes spacing inbetween the grid items.
   */
  noSpacing: PropTypes.bool,
};
