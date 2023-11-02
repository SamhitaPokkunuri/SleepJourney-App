import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';
import MuiGrid from '@mui/material/Grid';

import SocialIcon from 'components/social/social-icons/SocialIcon';

const StyledSocialProfiles = styled(MuiBox)(
  ({ theme }) => css`
    &.text-align-center {
      text-align: center;

      p {
        margin-left: auto;
        margin-right: auto;
      }
    }

    &.text-align-right {
      text-align: right;

      p {
        margin-left: auto;
      }
    }

    .container {
      a {
        margin-right: ${theme.spacing(2.5)};

        ${theme.breakpoints.up('md')} {
          margin-right: ${theme.spacing(3.5)};
        }
      }

      &.container-fixed-width {
        ${theme.breakpoints.up('sm')} {
          max-width: ${theme.containers.values.sm}px;
        }

        ${theme.breakpoints.up('lg')} {
          max-width: ${theme.containers.values.xl}px;
        }
      }
    }

    .disableMargin {
      margin: 0;
    }
  `
);

export default function SocialProfiles({
  textAlign,
  linkedin,
  twitter,
  youtube,
  instagram,
  facebook,
  className,
  type,
  container,
  disableMargin = false,
}) {
  return (
    <StyledSocialProfiles className={`text-align-${textAlign}`}>
      <MuiContainer
        className={clsx('container', {
          'container-fixed-width': container,
        })}
      >
        <MuiGrid container direction="row">
          <MuiGrid
            component="p"
            className={clsx({
              disableMargin,
            })}
          >
            {linkedin ? (
              <SocialIcon
                platform="linkedin"
                style={className}
                href={linkedin}
                type={type}
              />
            ) : (
              ''
            )}
            {twitter ? (
              <SocialIcon
                platform="twitter"
                style={className}
                href={twitter}
                type={type}
              />
            ) : (
              ''
            )}
            {youtube ? (
              <SocialIcon
                platform="youtube"
                style={className}
                href={youtube}
                type={type}
              />
            ) : (
              ''
            )}
            {instagram ? (
              <SocialIcon
                platform="instagram"
                style={className}
                href={instagram}
                type={type}
              />
            ) : (
              ''
            )}
            {facebook ? (
              <SocialIcon
                platform="facebook"
                style={className}
                href={facebook}
                type={type}
              />
            ) : (
              ''
            )}
          </MuiGrid>
        </MuiGrid>
      </MuiContainer>
    </StyledSocialProfiles>
  );
}

SocialProfiles.prototypes = {
  linkedin: PropTypes.string,
  twitter: PropTypes.string,
  youtube: PropTypes.string,
  instagram: PropTypes.string,
  facebook: PropTypes.string,
  disableMargin: PropTypes.bool,
  className: PropTypes.oneOf(['default', 'is-style-brand', 'is-style-light']),
};
