/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test/utils';
import { Default } from './Icon.stories';

describe('Icon', () => {
  it('should render icon', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    const icon = getByRole('img');
    expect(
      icon.querySelector('[data-src="/icons/group/airplane.svg"]')
    ).toBeTruthy();
  });

  const groupIcons = [
    'alcohol',
    'dashboard-speed',
    'building-public',
    'extra-services',
  ];

  test.each(groupIcons)('should change icon within the same group', (input) => {
    const { getByRole } = render(<Default {...Default.args} icon={input} />);
    const icon = getByRole('img');
    expect(
      icon.querySelector(`[data-src="/icons/group/${input}.svg"]`)
    ).toBeTruthy();
  });

  it('should not render svg if the iconSet changed', () => {
    const { getByRole } = render(
      <Default {...Default.args} iconSet="global" />
    );
    const icon = getByRole('img');
    expect(
      icon.querySelector('[data-src="/icons/group/airplane.svg"]')
    ).toBeFalsy();
  });

  const otherIcons = [
    ['global', 'share'],
    ['global', 'swipe-across'],
    ['global', 'pop-out'],
    ['global', 'download'],
  ];

  test.each(otherIcons)('should change icon and iconSet', (input, expected) => {
    const { getByRole } = render(
      <Default {...Default.args} iconSet={input} icon={expected} />
    );
    const icon = getByRole('img');
    expect(
      icon.querySelector(`[data-src="/icons/${input}/${expected}.svg"]`)
    ).toBeTruthy();
  });

  const iconSize = [
    ['extra-small', 'fontSizeExtraSmall'],
    ['small', 'fontSizeSmall'],
    ['medium', 'fontSizeMedium'],
    ['large', 'fontSizeLarge'],
    ['extra-large', 'fontSizeExtraLarge'],
  ];

  test.each(iconSize)('should change icon fontSize', (input, expected) => {
    const { getByRole } = render(
      <Default {...Default.args} fontSize={input} />
    );
    const icon = getByRole('img');
    expect(icon.className).toMatch(expected);
  });

  it('should render outlined border', () => {
    const { getByRole } = render(<Default {...Default.args} outlined />);
    const icon = getByRole('img');
    expect(icon.className).toMatch('outlined');
  });
});
