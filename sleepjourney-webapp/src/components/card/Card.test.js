/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test/utils';
import { Default, Country, Foundation } from './Card.stories';

describe('Default Card', () => {
  it('should render category', () => {
    const { getAllByRole } = render(<Default {...Default.args} />);
    expect(getAllByRole('link')[0]).toHaveTextContent(/Press Release/i);
  });
  it('should hide category when showCategory is false', () => {
    const { queryByRole } = render(
      <Default {...Default.args} showCategory={false} />
    );
    expect(queryByRole('link', { name: 'Press Release' })).toBeFalsy();
  });
  it('should render date', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(
      getByRole('link', { name: 'Press Release' }).previousSibling
    ).toHaveTextContent(/22 Jul 2021/i);
  });
  it('should hide date when showDate is false', () => {
    const { getByRole } = render(
      <Default {...Default.args} showDate={false} />
    );
    expect(
      getByRole('link', { name: 'Press Release' }).previousSibling
    ).toBeFalsy();
  });
  it('should render description', () => {
    const { getByText } = render(<Default {...Default.args} />);
    expect(getByText('This year', { exact: false })).toHaveTextContent(
      /This year Vodafone Foundation and their partner, UNHCR, the UN Refugee Agency, reach milestone anniversaries, with a century of activity between them. Andrew Dunnett, Director, SDGs, Sustainable Business and Foundations at Vodafone Group, reflects on the renewed importance of the partnership through the pandemic./i
    );
  });
  it('should hide description when showDescription is false', () => {
    const { queryByText } = render(
      <Default {...Default.args} showDescription={false} />
    );
    expect(queryByText('This year', { exact: false })).toBeFalsy();
  });

  it('should render image', () => {
    const { getByAltText } = render(<Default {...Default.args} />);
    expect(getByAltText('Why Vodafone', { exact: false, queryFallbacks: true }))
      .toBeInTheDocument;
  });
  it('should hide image when showImage is false', () => {
    const { queryByAltText } = render(
      <Default {...Default.args} showImage={false} />
    );
    expect(
      queryByAltText('Why Vodafone', { exact: false, queryFallbacks: true })
    ).not.toBeInTheDocument();
  });
  it('should change layout if single column is true', () => {
    const { container } = render(
      <Default {...Default.args} singleColumn={true} />
    );
    expect(container.querySelector('.MuiCard-root').className).toMatch(
      /singleColumn/i
    );
  });
  it('should render as feature card', () => {
    const { container } = render(
      <Default {...Default.args} featureCard={true} />
    );
    expect(container.querySelector('.MuiCard-root').className).toMatch(
      /featureCard/i
    );
  });
  it('should render as first card', () => {
    const { container } = render(
      <Default {...Default.args} firstCard={true} />
    );
    expect(container.querySelector('.MuiCard-root').className).toMatch(
      /firstCard/i
    );
  });
});

describe('Title', () => {
  it('should render title', () => {
    const { getByText } = render(<Default {...Default.args} />);
    expect(getByText('Why', { exact: false })).toHaveTextContent(
      /Why Vodafone Foundation’s partnership with UNHCR has never been more important/i
    );
  });

  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  it('should hide title when showTitle is false', () => {
    const { queryByText } = render(
      <Default {...Default.args} showTitle={false} />
    );
    expect(queryByText('heading', { name: 'Why', exact: false })).toBeFalsy();
  });
});

describe('should render shareIcons', () => {
  it('should render main share icon', () => {
    const { container } = render(<Default {...Default.args} />);
    expect(
      container.querySelector('[data-src="/icons/global/share.svg"]')
    ).toBeInTheDocument();
  });

  it('should hide share icons when showShareIcons is false', () => {
    const { container } = render(
      <Default {...Default.args} showShareIcons={false} />
    );
    expect(
      container.querySelector('[data-src="/icons/global/share.svg"]')
    ).not.toBeInTheDocument();
  });

  const { container } = render(<Default {...Default.args} />);
  const iconsList = container.querySelector('.socialList').children;

  const socialIcons = [
    ['facebook', 0],
    ['linkedin', 1],
    ['twitter', 2],
    ['email', 3],
  ];

  it.each(socialIcons)('platform icon', (platform, index) => {
    expect(iconsList[index].firstElementChild).toHaveClass(platform);
  });
});

describe('Tags', () => {
  it('should render tags', () => {
    const { container } = render(<Default {...Default.args} />);
    expect(container.querySelectorAll('ul')[1].children).toHaveLength(5);
  });

  it('should hide tags when showTag is false', () => {
    const { container } = render(
      <Default {...Default.args} showTags={false} />
    );
    expect(container.querySelectorAll('ul')).toHaveLength(1);
  });

  const { getAllByRole } = render(<Default {...Default.args} />);
  const tagsList = getAllByRole('list')[1].children;

  const tagNames = [
    ['5G', 0],
    ['Infrastructure', 1],
    ['Mergers and Acquisitions', 2],
    ['Networks', 3],
    ['Press Release', 4],
  ];
  it.each(tagNames)('tag', (tag, index) => {
    expect(tagsList[index]).toHaveAttribute(
      'href',
      `/news?tag=${tag.replace(new RegExp(' ', 'g'), '+')}`
    );
  });
});

describe('Links and navigation', () => {
  it('should render link elements', () => {
    const { getByRole, container } = render(<Default {...Default.args} />);

    expect(getByRole('heading').querySelector('a')).toBeInTheDocument();
    expect(container.querySelector('.endTextIcon')).toBeInTheDocument();
  });

  it('should disable link when showLink is false', () => {
    const { getByRole, container } = render(
      <Default {...Default.args} showLink={false} />
    );

    expect(getByRole('heading').querySelector('a')).not.toBeInTheDocument();
    expect(container.querySelector('.end-icon')).not.toBeInTheDocument();
  });

  let windowSpy;
  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'window', 'get');
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should navigate to category news page', () => {
    const { queryByRole } = render(<Default {...Default.args} />);
    const category = queryByRole('link', { name: 'Press Release' });
    expect(category).toHaveAttribute(
      'href',
      'https://www.vodafone.com/news/press-release'
    );

    windowSpy.mockImplementation(() => ({
      location: {
        origin: category['href'],
      },
    }));
    expect(window.location.origin).toEqual(
      'https://www.vodafone.com/news/press-release'
    );
  });

  it('should navigate to article page', () => {
    const { getByText } = render(<Default {...Default.args} />);

    const cardLink = getByText('Why', { exact: false });

    expect(cardLink).toHaveAttribute(
      'href',
      'https://www.vodafone.com/news/press-release/vodafone-spain-acquires-2x10mhz-spectrum-expand-5g-services'
    );

    windowSpy.mockImplementation(() => ({
      location: {
        origin: cardLink['href'],
      },
    }));
    expect(window.location.origin).toEqual(
      'https://www.vodafone.com/news/press-release/vodafone-spain-acquires-2x10mhz-spectrum-expand-5g-services'
    );
  });
});

describe('Country card', () => {
  it('should render country card', () => {
    const { container } = render(<Country {...Country.args} />);
    expect(container.querySelector('.MuiCard-root').className).toMatch(
      /country/i
    );
  });
});

describe('Foundation card', () => {
  it('should render foundation card', () => {
    const { container } = render(<Foundation {...Foundation.args} />);
    expect(container.querySelector('.MuiBox-root').className).toMatch(
      /foundationCard/i
    );
  });
});
