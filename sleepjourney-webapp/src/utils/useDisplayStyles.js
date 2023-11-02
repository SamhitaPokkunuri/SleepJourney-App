function getDisplay(value) {
  if (value && typeof value === 'boolean') {
    return `none`;
  }
  return 'block';
}

export default function useDisplayStyles(props) {
  const styles = {
    display: {
      xs: getDisplay(props?.mobile),
      sm: getDisplay(props?.tablet),
      md: getDisplay(props?.desktop),
    },
  };

  return styles;
}
