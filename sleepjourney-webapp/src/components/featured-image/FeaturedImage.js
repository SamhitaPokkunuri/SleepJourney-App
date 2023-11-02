import clsx from 'clsx';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

import { NextImage, ImageCaption } from 'components';

const StyledFeaturedImage = styled(MuiBox)(
  ({ theme }) => css`
    position: relative;
    background: ${theme.palette.common.shadeGrey};
    padding: 0;
    margin: 0;

    .picture {
      position: relative;
      height: 200px;

      ${theme.breakpoints.up('sm')} {
        height: 240px;
      }

      ${theme.breakpoints.up('md')} {
        height: 400px;
      }
    }

    .largePicture {
      ${theme.breakpoints.up('md')} {
        height: 550px;
      }
    }
  `
);

export default function FeaturedImage(props) {
  const { level, src, title } = props;

  return (
    <StyledFeaturedImage component="figure">
      <MuiBox
        className={clsx('picture', {
          largePicture: level === 2,
        })}
      >
        <NextImage src={src} layout="fill" objectFit="cover" alt={title} />
      </MuiBox>
      <ImageCaption color="red">{title}</ImageCaption>
    </StyledFeaturedImage>
  );
}
