import PropTypes from 'prop-types';
import clsx from 'clsx';
import Image from 'next/image';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, css } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

const StyledNextImage = styled(MuiBox, {
  shouldForwardProp: (prop) => /(src)/.test(prop) === false,
})(
  ({ src }) => css`
  &.layoutFill {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &.ieImage {
    background-image: url(${src});
    background-size: cover;
    background-position: 50%;
    background-repeat: no-repeat;
  },
`
);

export default function NextImage(props) {
  const { src, layout, alt, ...rest } = props;
  const ie11 = useMediaQuery('@media all and (-ms-high-contrast:none)');

  if (!src) {
    return null;
  }

  return ie11 ? (
    <StyledNextImage
      className={clsx('ieImage', {
        layoutFill: layout === 'fill',
      })}
      src={src}
    />
  ) : (
    <Image alt={alt} src={src} layout={layout} {...rest} />
  );
}

NextImage.propTypes = {
  alt: PropTypes.string,
  src: PropTypes.string,
  layout: PropTypes.string,
};
