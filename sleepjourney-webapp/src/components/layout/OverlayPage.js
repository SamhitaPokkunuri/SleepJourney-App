import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled, css } from '@mui/material/styles';
import MuiContainer from '@mui/material/Container';
import MuiBox from '@mui/material/Box';

import { CloseBox, Section } from 'components';

const StyledOverlayPage = styled(MuiContainer, {
  shouldForwardProp: (prop) => /(dreamLab)/.test(prop) === false,
})(
  ({ theme, dreamLab }) => css`
    background-color: ${dreamLab
      ? theme.palette.common.white
      : theme.palette.common.defaultGrey};
    color: ${dreamLab
      ? theme.palette.common.black
      : theme.palette.common.white};
    max-width: none !important;
    margin: auto;
    padding: 30px 0 0 0;
    width: 100%;
    min-height: 100vh;

    ${theme.breakpoints.up('sm')} {
      padding: ${dreamLab ? '60px 0px' : '60px 5%'};
    }

    ${theme.breakpoints.up('md')} {
      padding: ${dreamLab ? '140px 0px 60px' : '140px 5% 60px'};
    }

    p a,
    h1 a,
    h2 a,
    h3 a,
    h4 a,
    h5 a,
    h6 a {
      color: inherit;
    }
  `
);

export default function OverlayPage({ fieldParent, firstSection, children }) {
  const router = useRouter();
  const dreamLab = Boolean(
    router.asPath === '/mobile-world-congress-2021/dreamlab'
  );

  let parentPath = '/';
  if (fieldParent?.entity?.path?.alias) {
    parentPath = fieldParent.entity.path.alias;
  }

  useEffect(() => {
    if (parentPath) {
      router.prefetch(parentPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledOverlayPage dreamLab={dreamLab}>
      <CloseBox
        onClick={() => {
          if (parentPath) {
            router.push(parentPath);
          } else {
            router.back();
          }
        }}
      >
        Close
      </CloseBox>
      {firstSection ? (
        <MuiBox>{children}</MuiBox>
      ) : (
        <Section>
          <MuiBox>{children}</MuiBox>
        </Section>
      )}
    </StyledOverlayPage>
  );
}
