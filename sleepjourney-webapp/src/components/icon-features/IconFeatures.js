import { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiGrid from '@mui/material/Grid';

import { IconFeature } from 'components';
import useWidthStyles from 'utils/useWidthStyles';
import { ThemeContext } from '../layout/FoundationPage';

const StyledIconFeatures = styled(MuiBox)(
  ({ theme }) => css`
    margin: 30px auto 0;

    ${theme.breakpoints.up('sm')} {
      margin-top: 0;
    }

    .marginBottom {
      margin-bottom: ${theme.spacing(3)};
    }

    .singleColumn {
      margin: auto;

      ${theme.breakpoints.up('sm')} {
        max-width: 348px;
      }

      ${theme.breakpoints.up('lg')} {
        max-width: 33.33%;
      }
    }
  `
);

export default function IconFeatures(props) {
  const {
    border,
    children,
    className,
    columns,
    contentAlign,
    dropShadow,
    extraPadding,
    marginBottom,
    noSpacing,
    widthControlExt,
  } = props;

  const isRows = /(is-style-row)/.test(className);
  const context = useContext(ThemeContext);
  const isFoundation = context === 'foundation';
  const widthStyles = useWidthStyles(widthControlExt, isFoundation);

  return (
    <StyledIconFeatures sx={{ ...widthStyles }}>
      <MuiGrid
        container
        direction={isRows ? 'column' : 'row'}
        spacing={
          noSpacing
            ? 0
            : {
                xs: 2,
                md: 4,
              }
        }
        justifyContent={isRows ? 'flex-start' : 'center'}
        className={clsx(className, {
          marginBottom,
          root: isFoundation,
          singleColumn: columns === 1,
        })}
      >
        {children.map(({ key, props: featureProps }, index) => {
          return (
            <IconFeature
              key={key}
              first={index === 0}
              columns={columns}
              contentAlign={contentAlign}
              isRows={isRows}
              border={border}
              dropShadow={dropShadow}
              noSpacing={noSpacing}
              extraPadding={extraPadding}
              marginBottom={marginBottom}
              {...featureProps}
            />
          );
        })}
      </MuiGrid>
    </StyledIconFeatures>
  );
}

IconFeatures.defaultProps = {
  marginBottom: true,
};

IconFeatures.propTypes = {
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
   * Used to add a drop shadow.
   */
  dropShadow: PropTypes.bool,
  /**
   * Used to add extra padding to the top and bottom of the component.
   */
  extraPadding: PropTypes.bool,
  /**
   * Adds margin to the bottom of the component.
   */
  marginBottom: PropTypes.bool,
  /**
   * Removes spacing inbetween the grid items.
   */
  noSpacing: PropTypes.bool,
  /**
   * @ignore
   */
  widthControlExt: PropTypes.shape({
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
  }),
};
