export default function fromPascalCaseIntoKebabCase(str) {
  const replacedString = str?.replace(/[A-Z0-9]/g, (match, index, string) => {
    const lowerCasedMatch = match.toLowerCase();
    const previousChar = string.charAt(index - 1);

    if (index === 0 || !isNaN(previousChar)) {
      return lowerCasedMatch;
    }

    return `-${lowerCasedMatch}`;
  });

  return replacedString;
}
