//Application dependencies
import PropTypes from 'prop-types';
// Vendor and internal dependencies
import { Heading } from 'components';

function HeadingPreRender(props) {
  const { level, content, className, ...rest } = props;

  let color = 'inherit';

  if (/vdf-text-white/.test(className)) {
    color = 'white';
  } else if (/vdf-text-grey/.test(className)) {
    color = 'grey';
  } else if (/vdf-text-darkgrey/.test(className)) {
    color = 'darkGrey';
  } else if (/vdf-text-vodafonered/.test(className)) {
    color = 'red';
  }

  let fontWeight = 'default';

  if (/thin-heading/.test(className)) {
    fontWeight = 'thin';
  } else if (/<(strong|b).*>/.test(content)) {
    fontWeight = 'mixed';
  }

  return (
    <Heading
      variant={`h${level}`}
      fontWeight={fontWeight}
      color={color}
      {...rest}
    >
      {content}
    </Heading>
  );
}

HeadingPreRender.propTypes = {
  /**
   * The heading variant
   */
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  /**
   * The content of the component.
   */
  content: PropTypes.string,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default HeadingPreRender;
