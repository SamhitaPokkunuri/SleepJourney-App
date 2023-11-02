/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test/utils';
import { Default } from './SectionDividerPattern.stories';

describe('Section Divider Pattern', () => {
  it('should render section-divider-pattern', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('img')).toBeInTheDocument();
    expect(getByRole('img')).toHaveAttribute('src');
  });

  const patterns = [
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
  ];

  test.each(patterns)(
    'should render section-divider-pattern with different pattern each time',
    (input) => {
      const { getByRole } = render(
        <Default {...Default.args} patternName={input} />
      );
      expect(getByRole('img')).toBeInTheDocument();
      expect(getByRole('img')).toHaveAttribute('src');
    }
  );
});
