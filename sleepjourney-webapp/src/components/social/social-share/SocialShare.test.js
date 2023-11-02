/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';
import { Default } from './SocialShare.stories';

describe('Social Share', () => {
  it('should render social share list', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);

    const socialList = getAllByRole('list')[0];

    expect(socialList).toBeInTheDocument();
    expect(socialList.children).toHaveLength(4);
  });

  const socialIcons = [
    ['facebook', 0],
    ['linkedin', 1],
    ['twitter', 2],
    ['email', 3],
  ];
  const { getByRole } = render(<Default {...Default.args} />);
  const iconsList = getByRole('list').children;
  it.each(socialIcons)('platform icon', (platform, index) => {
    expect(iconsList[index].firstElementChild).toHaveClass(platform);
  });
});

describe('Styling', () => {
  it('should render default style', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);

    const link = getAllByRole('link')[0];

    expect(link.className).toMatch(/default/i);
  });

  it('should change style', () => {
    const { getAllByRole } = render(
      <Default {...Default.args} className={'is-style-light'} />
    );

    const link = getAllByRole('link')[0];

    expect(link.className).toMatch(/is-style-light/i);
  });

  const fontSizes = [
    ['inherit', 'Inherit'],
    ['small', 'Small'],
    ['large', 'Large'],
  ];

  it.each(fontSizes)('font size', (size, style) => {
    const { getAllByRole } = render(
      <Default {...Default.args} fontSize={size} />
    );

    const link = getAllByRole('link')[0];

    expect(link.className).toMatch(new RegExp(style, 'i'));
  });
});

describe('Share Icon', () => {
  it('should render share icon', () => {
    const { getByRole } = render(
      <Default {...Default.args} collapsed={true} />
    );
    expect(
      getByRole('img').querySelector('[data-src="/icons/global/share.svg"]')
    ).toBeInTheDocument();
  });

  it('toggled shared icon', () => {
    const { queryByRole } = render(<Default {...Default.args} />);
    expect(queryByRole('img')).toBeFalsy();
  });
});

describe('Platform toggle', () => {
  it('facebook toggle', () => {
    const { getByRole } = render(
      <Default {...Default.args} facebook={false} />
    );
    expect(
      getByRole('list').querySelector('.facebook')
    ).not.toBeInTheDocument();
  });
  it('linkedin toggle', () => {
    const { getByRole } = render(
      <Default {...Default.args} linkedin={false} />
    );
    expect(
      getByRole('list').querySelector('.linkedin')
    ).not.toBeInTheDocument();
  });
  it('twitter toggle', () => {
    const { getByRole } = render(<Default {...Default.args} twitter={false} />);
    expect(getByRole('list').querySelector('.twitter')).not.toBeInTheDocument();
  });
  it('email toggle', () => {
    const { getByRole } = render(<Default {...Default.args} email={false} />);
    expect(getByRole('list').querySelector('.email')).not.toBeInTheDocument();
  });
});

describe('Navigation', () => {
  let windowSpy;
  const { canonical: url, title, description } = Default.args;

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('facebook share', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    const platform = getAllByRole('link')[0];
    expect(platform).toHaveAttribute(
      'href',
      `https://www.facebook.com/sharer/sharer.php?u=${url}`
    );
    windowSpy.mockImplementation(() => ({
      location: {
        origin: platform['href'],
      },
    }));
    expect(window.location.origin).toEqual(platform['href'], '_blank');
  });

  it('linkedin share', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    const platform = getAllByRole('link')[1];
    expect(platform).toHaveAttribute(
      'href',
      `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&${description}&source=LinkedIn`
    );
    windowSpy.mockImplementation(() => ({
      location: {
        origin: platform['href'],
      },
    }));
    expect(window.location.origin).toEqual(platform['href'], '_blank');
  });

  it('twitter share', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    const platform = getAllByRole('link')[2];
    expect(platform).toHaveAttribute(
      'href',
      `https://twitter.com/share?url=${url}`
    );
    windowSpy.mockImplementation(() => ({
      location: {
        origin: platform['href'],
      },
    }));
    expect(window.location.origin).toEqual(platform['href'], '_blank');
  });

  it('linkedin share', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    const platform = getAllByRole('link')[3];
    expect(platform).toHaveAttribute(
      'href',
      `mailto:?&subject=${title}&body=${url}`
    );
    windowSpy.mockImplementation(() => ({
      location: {
        origin: platform['href'],
      },
    }));
    expect(window.location.origin).toEqual(platform['href'], '_blank');
  });
});
