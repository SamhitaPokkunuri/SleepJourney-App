/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';

import { Default } from './DateSocialBar.stories';

describe('Toggle the collapse behavior', () => {
  it('should render share icon', () => {
    const { getByRole } = render(<Default {...Default.args} collapsed />);
    expect(getByRole('img')).toBeTruthy();
  });
  it('shouldnt render social share icons', () => {
    const { queryByRole } = render(<Default {...Default.args} collapsed />);
    expect(queryByRole('list')).toBeFalsy();
  });
  it('shouldnt render share icon', () => {
    const { queryByRole } = render(<Default {...Default.args} />);
    expect(queryByRole('img')).toBeFalsy();
  });
  it('should render social share icons', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('list')).toBeTruthy();
  });
});
describe('Toggle showing share icons', () => {
  it('should show share icons', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('list')).toBeTruthy();
  });
  it('shouldnt render social share icons', () => {
    const { queryByRole } = render(
      <Default {...Default.args} showShareIcons={false} />
    );
    expect(queryByRole('list')).toBeFalsy();
  });
});
describe('Change icons style type', () => {
  it('should show share icons', () => {
    const { getByRole } = render(<Default {...Default.args} type="fill" />);
    expect(getByRole('list').querySelector('.facebook')).toHaveClass('fill');
  });
});
