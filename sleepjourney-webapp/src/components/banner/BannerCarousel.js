//Application dependencies
import parse, { attributesToProps } from 'html-react-parser';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// Vendor and internal dependencies
import { Banner, Slider } from 'components';

export default function BannerCarousel(props) {
  const { heroBanner = false, autoplay = false, autoplaySpeed = 4500 } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const carousel = props.children.length > 1;

  const slickSettings = {
    arrows: !isMobile,
    dots: true,
    fade: true,
    speed: 0, // disables Slick transitions
    autoplay,
    autoplaySpeed,
  };

  const children = props.children.map((child) => {
    const { title, description } = child.props;
    const { name, url, src, poster, alt } = child.props.children[0].props;
    const type = name === 'core/image' ? 'image' : 'video';

    const button = parse(child.props.link, {
      replace: (domNode) => {
        if (domNode.attribs && domNode.name === 'a') {
          return attributesToProps(domNode.attribs);
        }
      },
    }).props;

    const bannerProps = {
      title,
      description,
      button,
      media: {
        type,
        url: url || src,
        poster,
        alt,
      },
      heroBanner,
      carousel,
    };

    return <Banner key={child.key} {...bannerProps} />;
  });

  return carousel ? (
    <Slider appearance="banner" marginBottom={false} flex {...slickSettings}>
      {children}
    </Slider>
  ) : (
    children
  );
}

BannerCarousel.propTypes = {
  heroBanner: PropTypes.bool,
  autoplay: PropTypes.bool,
  autoplaySpeed: PropTypes.number,
};
