/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';

import { Default } from './FileList.stories';

describe('FileList', () => {
  it('should render title', () => {
    const { getByRole } = render(<Default {...Default.args} />);

    expect(
      getByRole('heading', { name: 'Files List', exact: true })
    ).toBeTruthy();
  });
  it('shouldnt render title', () => {
    const { queryByRole } = render(
      <Default {...Default.args} title={{ toggle: false, text: 'No Title' }} />
    );

    expect(queryByRole('heading')).toBeFalsy();
  });
});

describe('Files', () => {
  const { getAllByRole } = render(
    <Default {...Default.args} title={{ toggle: false, text: 'Other Title' }} />
  );
  const files = getAllByRole('link');
  it('should render children', () => {
    expect(files).toHaveLength(2);
  });

  const fileNames = [
    ['Guidance note', 0],
    ['Vodafone Renewables', 1],
  ];

  it.each(fileNames)('fileName', (name, index) => {
    expect(files[index]).toHaveTextContent(name);
  });
});
