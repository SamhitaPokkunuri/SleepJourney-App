/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';

import { Primary } from './CardList.stories';

describe('Primary cardlist', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should render  all cards', () => {
    const { container } = render(<Primary {...Primary.args} />);
    expect(container.querySelector('.MuiGrid-container').children).toHaveLength(
      4
    );
  });

  it('should render 1st card data (toggle:true)', () => {
    const { getByRole, getByText, queryByAltText } = render(
      <Primary {...Primary.args} />
    );

    const link = getByRole('link', {
      name: 'Why Vodafone Foundation’s partnership with UNHCR has never been more important',
    });

    expect(queryByAltText(/Why Vodafone Foundation’s /i)).toBeTruthy();
    expect(
      getByRole('heading', {
        name: 'Why Vodafone Foundation’s partnership with UNHCR has never been more important',
      })
    );
    expect(
      getByText(/This year Vodafone Foundation and their partner/i, {
        exact: false,
        selector: 'span',
      })
    ).toBeTruthy();
    expect(link).toHaveTextContent(
      /Why Vodafone Foundation’s partnership with UNHCR has never been more important/i
    );
    expect(link).toHaveAttribute(
      'href',
      'https://www.vodafone.com/news/viewpoint/vodafone-plays-part-respecting-human-rights'
    );
  });

  it('shouldnt render 2nd card description & link (toggle:false)', () => {
    const { queryByText, queryByRole } = render(<Primary {...Primary.args} />);
    expect(
      queryByText(/Human Rights Day is celebrated every year/i, {
        exact: false,
        selector: 'span',
      })
    ).toBeFalsy();
    expect(
      queryByRole('link', {
        name: 'How Vodafone plays its part in respecting human rights',
      })
    ).toBeFalsy();
  });

  it('shouldnt render 3rd image (toggle:false)', () => {
    const { queryByAltText } = render(<Primary {...Primary.args} />);
    expect(
      queryByAltText(
        /5G can help us reimagine education as an amazing learning experience/i
      )
    ).toBeFalsy();
  });

  it('shouldnt render 4th title (toggle:false)', () => {
    const { queryByText } = render(<Primary {...Primary.args} />);
    expect(
      queryByText(
        'Vodafone announces new targets to increase ethnic diversity',
        { exact: false }
      )
    ).toBeFalsy();
  });

  const columns = [
    [1, 'MuiGrid-grid-md-12'],
    [2, 'MuiGrid-grid-md-6'],
    [3, 'MuiGrid-grid-md-4'],
    [4, 'MuiGrid-grid-md-3'],
  ];
  test.each(columns)(
    'change card layout when number of colums changed',
    (input, expected) => {
      const { container } = render(
        <Primary {...Primary.args} columns={[input]} />
      );

      const result = container.querySelector('.MuiGrid-root');
      result.classList.add(expected);
      expect(result.className).toMatch(expected);
    }
  );

  it('shouldnt render change design when variation set to foundation', () => {
    const { container } = render(
      <Primary {...Primary.args} variation="foundation" />
    );
    expect(
      container.querySelector('.MuiGrid-item').firstChild.className
    ).toMatch(/foundationCard/i);
  });
});
