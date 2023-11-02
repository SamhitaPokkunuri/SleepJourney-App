import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

const StyledSocialExco = styled(MuiBox)`
  display: flex;
  align-items: center;

  & > h1,
  & > h2,
  & > h3,
  & > h4,
  & > h5,
  & > h6 {
    width: auto;
    margin-right: 24px;
  }
`;

export default function SocialExco(props) {
  const { children } = props;

  return <StyledSocialExco>{children}</StyledSocialExco>;
}

SocialExco.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node.isRequired,
};
