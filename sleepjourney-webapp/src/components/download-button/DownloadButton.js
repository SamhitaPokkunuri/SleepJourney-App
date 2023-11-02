import PropTypes from 'prop-types';
import { styled, css } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

import { Icon } from 'components';

const StyledDownloadButton = styled(MuiButton)(
  ({ theme }) => css`
    border: 0;
    border-radius: 2px;
    background-color: ${theme.palette.common.white};
    color: ${theme.palette.common.black};
    box-shadow: ${theme.cards.boxShadow};
    justify-content: space-between;

    &:hover {
      transform: scale(1.03);
      box-shadow: ${theme.cards.boxShadowHover};
      font-variant: normal;
      background-color: ${theme.palette.common.white};
    }

    .MuiButton-endIcon {
      color: ${theme.palette.common.red};
    }
  `
);

function DownloadButton(props) {
  const { children, icon, fullWidth, anchor, ...rest } = props;

  return (
    <StyledDownloadButton
      id={anchor}
      endIcon={<Icon icon={icon} iconSet="global" fontSize="small" />}
      fullWidth={fullWidth}
      download={icon === 'Download'}
      {...rest}
    >
      <span dangerouslySetInnerHTML={{ __html: children }} />
    </StyledDownloadButton>
  );
}

DownloadButton.propTypes = {
  /**
   * @ignore
   */
  anchor: PropTypes.string,
  /**
   * The content of the button.
   */
  children: PropTypes.node.isRequired,
  /**
   * Makes the button full width.
   */
  fullWidth: PropTypes.bool,
  /**
   * Icon placed after the children.
   */
  icon: PropTypes.oneOf([
    'Download',
    'PopOut',
    'PopOutFoundation',
    'ChevronRightCircle',
  ]),
};

DownloadButton.defaultProps = {
  fullWidth: true,
  icon: 'download',
};

export default DownloadButton;
