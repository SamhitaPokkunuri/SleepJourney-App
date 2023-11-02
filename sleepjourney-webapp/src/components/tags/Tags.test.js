/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';

import { Default } from './Tags.stories';

describe('Tags', () => {
  const { getAllByRole } = render(<Default {...Default.args} />);
  const tagElements = getAllByRole('listitem');

  it('should render all tags', () => {
    expect(tagElements).toHaveLength(2);
  });

  const tagNames = [
    ['Tag 1', 0],
    ['Tag 2', 1],
  ];

  it.each(tagNames)('tag', (tag, index) => {
    expect(tagElements[index]).toHaveAttribute(
      'href',
      `/news?tag=${tag.replace(new RegExp(' ', 'g'), '+')}`
    );
  });
});
