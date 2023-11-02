/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';

import { Default } from './ReactSelect.stories';

describe('React Select', () => {
  it('should render input', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('textbox')).toBeTruthy();
  });
});
