/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';

import { Default } from './Animation.stories';

describe('Animation', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  it('should render animation', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('button')).toBeTruthy();
  });
});
