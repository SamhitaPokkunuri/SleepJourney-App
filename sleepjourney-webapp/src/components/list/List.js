import PropTypes from 'prop-types';
import { useContext } from 'react';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiList from '@mui/material/List';

import useWidthStyles from 'utils/useWidthStyles';
import { ThemeContext } from '../layout/FoundationPage';

const StyledList = styled(MuiList, {
  shouldForwardProp: (prop) => /(color)/.test(prop) === false,
})(
  ({ theme, color }) => css`
    color: ${color === 'inherit' ? 'inherit' : theme.palette.common[color]};
    margin-top: ${theme.spacing(2)};
    margin-bottom: ${theme.spacing(2)};
    padding: inherit;
    list-style: revert;
    padding-left: ${theme.spacing(2)};

    ${theme.breakpoints.up('md')} {
      margin-top: ${theme.spacing(3)};
      margin-bottom: ${theme.spacing(3)};
    }

    &.compact {
      margin-top: -40px !important;

      li p {
        margin-top: ${theme.spacing(0)};
        margin-bottom: ${theme.spacing(0)};
      }
    }
  `
);

function List(props) {
  const { children, color, component, density, widthControlExt } = props;

  const context = useContext(ThemeContext);
  const isFoundation = context === 'foundation';
  const widthStyles = useWidthStyles(widthControlExt, isFoundation);

  return (
    <StyledList
      className={clsx({
        [density]: density !== 'default',
      })}
      disablePadding
      component={component}
      sx={{ ...widthStyles }}
      color={color}
    >
      {children}
    </StyledList>
  );
}

List.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
  /**
   * The color of the list component.
   */
  color: PropTypes.oneOf(['inherit', 'darkGrey', 'red', 'white']),
  /**
   * The component used for the root node.
   */
  component: PropTypes.oneOf(['ol', 'ul']),
  /**
   * Describes the desity of the component.
   */
  density: PropTypes.oneOf(['default', 'compact']),
  /**
   * @ignore
   */
  widthControlExt: PropTypes.shape({
    mobile: PropTypes.number,
    tablet: PropTypes.number,
    desktop: PropTypes.number,
  }),
};

List.defaultProps = {
  color: 'inherit',
  component: 'ul',
  density: 'default',
};

export default List;
