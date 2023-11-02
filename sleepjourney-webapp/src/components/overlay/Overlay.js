import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import MuiButton from '@mui/material/Button';
import MuiDialog from '@mui/material/Dialog';
import MuiFade from '@mui/material/Fade';
import MuiTypography from '@mui/material/Typography';

import { CloseBox, RenderBlock, Section } from 'components';
import { getContentPathBlocks } from 'lib/graphql/getContentPathBlocks';
import validateAndParseJSON from 'utils/validateAndParseJSON';
import useWidthStyles from 'utils/useWidthStyles';

const StyledOverlay = styled(MuiDialog, {
  shouldForwardProp: (prop) => /(dreamLab)/.test(prop) === false,
})(({ theme, dreamLab }) => {
  const containerCol = dreamLab
    ? theme.palette.common.white
    : theme.palette.common.defaultGrey;
  const paperCol = dreamLab
    ? theme.palette.common.black
    : theme.palette.common.white;
  const dreamLabPadding = '30px 0px';
  const dreamLabPaddingSm = dreamLab ? '60px 0px' : '60px 5%';
  const dreamLabPaddingMd = dreamLab ? '140px 0px 60px' : '140px 5% 60px';

  return css`
    .MuiDialog-container {
      background-color: ${containerCol};
    }

    .paper {
      background-color: transparent;
      color: ${paperCol};
      max-width: none !important;
      margin: auto;
      padding: ${dreamLabPadding};
      width: 100%;

      & p a,
      & h1 a,
      & h2 a,
      & h3 a,
      & h4 a,
      & h5 a,
      & h6 a {
        color: inherit;
      }

      ${theme.breakpoints.up('sm')} {
        padding: ${dreamLabPaddingSm};
      }

      ${theme.breakpoints.up('md')} {
        padding: ${dreamLabPaddingMd};
      }
    }

    .chevronLink {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      outline: none;
      color: ${theme.palette.common.white};

      &:before {
        font-family: VodafoneIcons;
        font-size: 2em;
      }

      span {
        color: transparent;
        position: absolute;
      }

      ${theme.breakpoints.down('sm')} {
        display: none;
      }
    }

    .prevLink {
      left: 11px;

      &::before {
        content: ${theme.icons.chevronLeftLG};
      }
    }

    .nextLink {
      right: 11px;

      &::before {
        content: ${theme.icons.chevronRightLG};
      }
    }

    .loading {
      display: flex;
      align-items: center;
    }
  `;
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <MuiFade ref={ref} {...props} />;
});

export default function Overlay({ open, setOpen, path, carouselPaths = [] }) {
  const router = useRouter();
  const dreamLab = Boolean(
    router.query.overlay === '/mobile-world-congress-2021/dreamlab'
  );

  const widthControlExt = { mobile: 12, tablet: 10, desktop: 8 };
  const widthStyles = useWidthStyles(widthControlExt);
  const [overlayData, setOverlayData] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState(path);

  // Effect to catch overlays inception
  useEffect(() => {
    setCurrentPath(path);
  }, [path]);

  useEffect(() => {
    async function fetchMyAPI() {
      setLoading(true);
      if (currentPath) {
        const response = await getContentPathBlocks(currentPath, true);
        setOverlayData(response);
      }
      setLoading(false);
    }

    if (open) {
      fetchMyAPI();
    }
  }, [currentPath, open]);

  let blocks = [];
  let bodyJson = '';
  if (overlayData?.node) {
    bodyJson = overlayData.node.bodyJson;
    blocks = validateAndParseJSON(bodyJson);
  }

  const handleCurrentPath = (dir) => () => {
    const index = carouselPaths.indexOf(currentPath);
    const nextIndex = index === carouselPaths.length - 1 ? 0 : index + 1;
    const prevIndex = index === 0 ? carouselPaths.length - 1 : index - 1;
    const path = carouselPaths[dir === 'next' ? nextIndex : prevIndex];
    setCurrentPath(path);
  };

  return (
    <StyledOverlay
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="vdf-modal-title"
      aria-describedby="vdf-modal-description"
      PaperProps={{
        classes: { root: 'paper' },
        elevation: 0,
        square: true,
      }}
      hideBackdrop
      transition={Transition}
      scroll="body"
      dreamLab={dreamLab}
    >
      <>
        <CloseBox onClick={() => setOpen(false)}>Close</CloseBox>
        {loading ? (
          <Section className="loading">
            <MuiTypography variant="body1" align="center">
              Loading...
            </MuiTypography>
          </Section>
        ) : blocks[0]?.name === 'vdfblocks/section' ? (
          overlayData?.node &&
          blocks.map((block, index, array) => RenderBlock(block, index, array))
        ) : (
          <Section>
            <MuiBox sx={{ ...widthStyles }}>
              {overlayData?.node &&
                blocks.map((block, index, array) =>
                  RenderBlock(block, index, array)
                )}
            </MuiBox>
          </Section>
        )}
        {carouselPaths.length > 0 && (
          <>
            <MuiButton
              className={clsx('chevronLink', 'prevLink')}
              color="inherit"
              onClick={handleCurrentPath('prev')}
            >
              Previous
            </MuiButton>
            <MuiButton
              className={clsx('chevronLink', 'nextLink')}
              color="inherit"
              onClick={handleCurrentPath('next')}
            >
              Next
            </MuiButton>
          </>
        )}
      </>
    </StyledOverlay>
  );
}
