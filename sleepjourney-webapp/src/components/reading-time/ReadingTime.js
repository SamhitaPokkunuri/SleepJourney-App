import readingTime from 'reading-time';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';
import Icon from 'components/icon/Icon';

const StyledReadingTime = styled(MuiBox)`
  display: flex;
  align-items: center;
  margin: 0 0 10px 0;

  .display-text {
    margin-left: 8px;
  }
`;

export function getReadingTimeText(components) {
  const blocks = [
    'core/heading',
    'core/paragraph',
    'core/quote',
    'core/list',
    'vdfblocks/button',
  ];
  let text = '';

  function getBlockContent(children) {
    if (children && typeof children === 'object') {
      if (blocks.indexOf(children.props?.name) > -1) {
        text +=
          children.props.content ||
          children.props.values ||
          children.props.text;
      }

      if (Array.isArray(children)) {
        children.forEach(getBlockContent);
      }

      return getBlockContent(children.props?.children);
    }

    return text;
  }

  return getBlockContent(components);
}

export function getReadingTimeTextHtml(html) {
  if (typeof window !== 'undefined') {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;

    const elements = tmp.getElementsByClassName('wp-block-image');
    while (elements.length > 0) elements[0].remove();

    const cleanedBody = tmp.textContent || tmp.innerText || '';
    return cleanedBody.replace(/(?:\r\n|\r|\n)/g, '');
  }
  return '';
}

export default function ReadingTime(props) {
  const { text, wordsPerMinute } = props;

  const { minutes } = readingTime(text, {
    wordsPerMinute,
  });

  const displayText = `${
    minutes > 0 && minutes < 1 ? '< 1' : Math.round(minutes)
  } minute read`;

  return (
    <StyledReadingTime id="reading-time">
      <Icon iconSet="global" icon="clock" fontSize="small" />
      <span className="display-text">{displayText}</span>
    </StyledReadingTime>
  );
}

ReadingTime.propTypes = {
  /**
   * The text used to calculate the reading time.
   */
  text: PropTypes.string.isRequired,
  /**
   * The words per minute an average reader can read.
   */
  wordsPerMinute: PropTypes.number,
};

ReadingTime.defaultProps = {
  wordsPerMinute: 200,
};
