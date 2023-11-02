import Select from 'react-select';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

const colourStyles = ({ palette, icons, spacing, cards }) => ({
  container: (styles) => ({
    ...styles,
    boxShadow: cards.boxShadow,
    borderRadius: '4px',
  }),
  control: (styles, { menuIsOpen, selectProps }) => ({
    ...styles,
    backgroundColor: 'white',
    borderRadius: menuIsOpen ? '4px 4px 0 0' : 4,
    minHeight: 44,
    borderColor: palette.common.spanishGrey,
    boxShadow: 'none',
    cursor: 'pointer',
    '&:hover': {
      borderColor: palette.common.spanishGrey,
      backgroundColor:
        (!selectProps.value || selectProps.value?.length === 0) &&
        palette.common.shadeGrey,
    },
  }),
  clearIndicator: (styles) => ({
    ...styles,
    svg: {
      display: 'none',
    },
    padding: 0,
    '&:after': {
      fontFamily: 'VodafoneIcons',
      content: icons.close,
      fontSize: '1em',
      color: palette.common.black,
      height: 24,
      width: 36,
      borderRight: `1px solid ${palette.common.silver}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
  dropdownIndicator: (styles, { selectProps }) => ({
    ...styles,
    padding: 10,
    color: 'inherit',
    fontSize: '1.125rem',
    svg: {
      display: 'none',
    },
    ':hover': {
      color: 'inherit',
    },
    '&:after': {
      fontFamily: 'VodafoneIcons',
      content: icons.chevronDownXL,
      fontSize: '0.625em',
      transition: 'transform .6s ease-in-out',
      transform: selectProps.menuIsOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
    },
  }),
  menu: (styles) => ({
    ...styles,
    margin: 0,
    borderRadius: '0 0 4px 4px',
    fontSize: '1.125rem',
    left: 1,
    right: 1,
    width: 'auto',
    boxShadow: `0 0 0 1px ${palette.common.spanishGrey}, 0 2px 4px 0 rgba(0, 0, 0, 0.2)`,
    overflow: 'hidden',
  }),
  menuList: (styles) => ({
    ...styles,
    padding: 0,
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isDisabled
      ? null
      : isSelected
      ? data.color
      : isFocused
      ? '#f1f1f1'
      : null,
    color: isDisabled ? '#ccc' : isSelected ? '#f1f1f1' : data.color,
    cursor: isDisabled ? 'not-allowed' : 'default',
    padding: spacing(1, 1.5),
    borderBottom: `1px solid ${palette.common.silver}`,
    cursor: 'pointer',
    ':active': {
      ...styles[':active'],
      backgroundColor: !isDisabled && (isSelected ? data.color : '#f1f1f1'),
    },
  }),
  valueContainer: (styles, { selectProps }) => {
    return {
      ...styles,
      padding: '6px 8px',
      paddingLeft:
        (!selectProps.value || selectProps.value?.length === 0) && spacing(1.5),
      lineHeight: '1.25rem',
      fontSize: '1.125rem',
    };
  },
  multiValue: (styles, { data }) => ({
    ...styles,
    backgroundColor: data.color || 'transparent',
    borderRadius: '4px',
    border: `1px solid ${data.color || palette.common.spanishGrey}`,
    color: data.color && palette.common.white,
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    background: 'transparent',
    color: 'inherit',
    padding: '3px 3px 1px 6px',
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    backgroundColor: 'transparent',
    svg: {
      display: 'none',
    },
    '&:after': {
      fontFamily: 'VodafoneIcons',
      content: icons.close,
      fontSize: '0.75em',
      color: data.color ? palette.common.white : palette.common.black,
    },
    ':hover': {
      backgroundColor: 'transparent',
    },
  }),
});

function ReactSelect(props) {
  const { options } = props;
  const theme = useTheme();
  const styles = colourStyles(theme);

  return (
    <Select
      options={options}
      components={{
        IndicatorSeparator: () => null,
      }}
      styles={styles}
      {...props}
    />
  );
}

ReactSelect.propTypes = {
  /**
   * The option elements to populate the select with.
   */
  options: PropTypes.array.isRequired,
};

export default ReactSelect;
