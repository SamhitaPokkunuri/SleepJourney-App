function getWidth(value) {
  if (value && typeof value === 'number') {
    return `${(value / 12) * 100}%`;
  }

  return undefined;
}

export default function useWidthStyles(
  columns,
  isFoundation = false,
  align = 'center'
) {
  const newColumns = columns;

  if (newColumns?.desktop === 8 && isFoundation) {
    newColumns.desktop = 6;
  }

  const styles = {
    width: {
      xs: getWidth(newColumns?.mobile),
      sm: getWidth(newColumns?.tablet),
      lg: getWidth(newColumns?.desktop),
    },
    marginLeft: /(center|right)/.test(align) ? 'auto' : undefined,
    marginRight: /(center)/.test(align) ? 'auto' : undefined,
  };

  return styles;
}
