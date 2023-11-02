import { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiCollapse from '@mui/material/Collapse';
import MuiList from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';

import { ToggleButton } from 'components';

const StyledSelect = styled(MuiBox)(
  ({ theme }) => css`
    display: inline-flex;
    flex-direction: column;
    position: relative;
    width: 100%;

    button {
      flex-grow: 1;
    }

    &.boxShadow {
      & > button,
      & > div {
        box-shadow: ${theme.cards.boxShadow};
      }

      & > div {
        border-radius: 0 0 6px 6px;
      }
    }

    .selectList {
      background: ${theme.palette.common.white};
      border: 1px solid ${theme.palette.common.spanishGrey};
      border-top: none;
      border-radius: 0 0 6px 6px;
      padding: 0;
      margin: 0;
      overflow: hidden;
      font-size: 1.125rem;

      & > li {
        width: 100%;
        padding: ${theme.spacing(1, 2)};
        border-bottom: 1px solid ${theme.palette.common.silver};
        cursor: pointer;
        margin: 0;

        &:last-of-type {
          border-bottom: none;
        }

        &:hover {
          background-color: ${theme.palette.common.shadeGrey};
        }
      }
    }

    .overlayDropdown {
      position: absolute;
      left: 0;
      right: 0;
      top: 100%;
      z-index: 10;
    }
  `
);

function Select(props) {
  const { options, value, onSelect, boxShadow, overlayDropdown } = props;

  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = (setState, value) => () => {
    setState(value);
  };

  return (
    <StyledSelect
      className={clsx({
        boxShadow: boxShadow === 'on' || (boxShadow === 'active' && dropdown),
      })}
    >
      <ToggleButton
        active={dropdown}
        label={value}
        collapseBorder={true}
        onClick={handleDropdown(setDropdown, !dropdown)}
      />
      <MuiCollapse
        className={clsx({ overlayDropdown: overlayDropdown })}
        in={dropdown}
      >
        <MuiList className="selectList">
          {options.map((item, index) => (
            <MuiListItem
              key={index}
              onClick={onSelect(item, () => setDropdown(false))}
            >
              {item.name}
            </MuiListItem>
          ))}
        </MuiList>
      </MuiCollapse>
    </StyledSelect>
  );
}

Select.propTypes = {
  /**
   * Sets a box shadow on the select element.
   */
  boxShadow: PropTypes.oneOf(['on', 'off', 'active']),
  /**
   * Callback function fired when an option is selected.
   */
  onSelect: PropTypes.func.isRequired,
  /**
   * The option elements to populate the select with.
   */
  options: PropTypes.array.isRequired,
  /**
   * Allows the select element to collapse over it's parent.
   */
  overlayDropdown: PropTypes.bool,
  /**
   * The input value. Providing an empty string will select no options.
   */
  value: PropTypes.string.isRequired,
};

Select.defaultProps = {
  boxShadow: 'off',
  overlayDropdown: false,
};

export default Select;
