/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';
import { Default } from './SocialProfiles.stories';

describe('Navigation', () => {
  let windowSpy;
  const { facebook, linkedin, twitter, instagram, youtube } = Default.args;

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  const socialProfiles = [
    [linkedin, 0],
    [twitter, 1],
    [youtube, 2],
    [instagram, 3],
    [facebook, 4],
  ];

  const { getAllByRole } = render(<Default {...Default.args} />);

  const platforms = getAllByRole('link');

  it('render all platforms', () => {
    expect(platforms).toHaveLength(5);
  });

  it.each(socialProfiles)('Social profile', (socialProfile, index) => {
    expect(platforms[index]).toHaveAttribute('href', socialProfile);
    windowSpy.mockImplementation(() => ({
      location: {
        origin: socialProfile,
      },
    }));
    expect(window.location.origin).toEqual(platforms[index]['href'], '_blank');
  });
});

describe('Styling', () => {
  it('brand style', () => {
    const { getAllByRole } = render(
      <Default {...Default.args} className={'is-style-brand'} />
    );
    expect(getAllByRole('link')[0].className).toMatch(/is-style-brand/i);
  });
  it('light style', () => {
    const { getAllByRole } = render(
      <Default {...Default.args} className={'is-style-light'} />
    );
    expect(getAllByRole('link')[0].className).toMatch(/is-style-light/i);
  });
  it('default style', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    expect(getAllByRole('link')[0].className).toMatch(/default/i);
  });
  it('disabled margin', () => {
    const { getAllByRole } = render(
      <Default {...Default.args} disableMargin={true} />
    );
    expect(getAllByRole('link')[0].parentElement.className).toMatch(
      /disableMargin/i
    );
  });
});
