//Application dependencies
import PropTypes from 'prop-types';
// Vendor and internal dependencies
import { Paragraph } from 'components';

export default function ParagraphPreRender(props) {
  const { content, className, ...rest } = props;

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

  return (
    <Paragraph color={color} {...rest}>
      {content}
    </Paragraph>
  );
}

ParagraphPreRender.propTypes = {
  content: PropTypes.string,
  /**
   * @ignore
   */
  className: PropTypes.string,
};
