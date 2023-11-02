import NextLink from 'next/link';
import { styled, css } from '@mui/material/styles';

import Icon from '../icon/Icon';

const StyledLogo = styled('a')(
  ({ theme }) => css`
    &.logo {
      display: flex;
      outline: none;
      align-items: center;
      position: relative;
      left: -2px;
      font-size: 2.125rem;

      ${theme.breakpoints.up('md')} {
        left: -3px;
        font-size: 3rem;
      }
    }
  `
);

export default function Logo(props) {
  const { nonav } = props;

  // Remove nonav, as props are being passed down to LogoVodafone component
  const clearProps = Object.assign({}, props);
  delete clearProps['nonav'];

  if (nonav) {
    return (
      <StyledLogo className="logo">
        <Icon
          icon="LogoVodafone"
          iconSet="group"
          fontSize="inherit"
          {...clearProps}
        />
      </StyledLogo>
    );
  }

  return (
    <NextLink href="/" passHref>
      <StyledLogo className="logo">
        <Icon
          icon="LogoVodafone"
          iconSet="group"
          fontSize="inherit"
          {...clearProps}
        />
      </StyledLogo>
    </NextLink>
  );
}
