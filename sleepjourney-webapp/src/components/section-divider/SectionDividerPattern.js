import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import MuiBox from '@mui/material/Box';

import { NextImage } from 'components';
import patterns from './patterns';

const StyledSectionDividerPattern = styled(MuiBox)`
  overflow: hidden;

  .pattern {
    min-width: 1920px;
    margin: 0 -60px;
  }
`;

export default function SectionDividerPattern(props) {
  const { patternName } = props;
  const pattern = patternName ? patterns[patternName] : patterns.Pattern01;

  return (
    <StyledSectionDividerPattern>
      <MuiBox className="pattern">
        <NextImage
          src={`/images/patterns/${pattern.name}.svg`}
          layout="responsive"
          height={pattern.height}
          width={pattern.width}
        />
      </MuiBox>
    </StyledSectionDividerPattern>
  );
}

SectionDividerPattern.propTypes = {
  /**
   * The pattern name.
   */
  patternName: PropTypes.oneOf([
    'Pattern01',
    'Pattern02',
    'Pattern03',
    'Pattern04',
    'Pattern05',
    'Pattern06',
    'Pattern07',
    'Pattern08',
    'Pattern09',
    'Pattern10',
    'Pattern11',
    'Pattern12',
  ]),
};
