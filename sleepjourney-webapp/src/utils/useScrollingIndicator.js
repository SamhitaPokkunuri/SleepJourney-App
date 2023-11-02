import React from 'react';
import throttle from 'utils/throttle';

export default function useScrollingIndicator() {
  const [scrollValue, setScrollValue] = React.useState();

  function scrollingIndicator() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    const windowHeight = scrollHeight - clientHeight;
    const scrolled = `${(scrollTop / windowHeight) * 100}%`;

    setScrollValue(scrolled);
  }

  React.useEffect(() => {
    const throttleScroll = throttle(scrollingIndicator, 100);

    window.addEventListener('scroll', throttleScroll);

    return () => window.removeEventListener('scroll', throttleScroll);
  }, []);

  return scrollValue;
}
