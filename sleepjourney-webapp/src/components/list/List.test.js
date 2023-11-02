/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render } from 'test/utils';
import { Ordered, Unordered } from './List.stories';

describe('Ordered List', () => {
  it('should render ordered list style', () => {
    const { getByRole } = render(<Ordered {...Ordered.args} />);
    const list = getByRole('list', { type: 'ol' });
    expect(list).toBeTruthy();
    expect(list).toHaveStyle('margin-top: 20px');
  });

  it('should render list items', () => {
    const { getAllByRole } = render(<Ordered {...Ordered.args} />);
    expect(getAllByRole('listitem').length).toBe(3);
    getAllByRole('listitem').forEach((listitem) => {
      expect(listitem).toHaveTextContent(listitem.textContent);
    });
  });

  const colors = [
    ['darkGrey', 'rgb(51, 51, 51)'],
    ['red', 'rgb(230, 0, 0)'],
    ['white', 'rgb(255, 255, 255)'],
  ];

  test.each(colors)(
    'should render list of items text with selected color',
    (input, expected) => {
      const { getByRole } = render(<Ordered {...Ordered.args} color={input} />);
      expect(getByRole('list')).toHaveStyle(`color:${expected}`);
    }
  );

  it('should render ordered list with diffrent density', () => {
    const { getByRole } = render(
      <Ordered {...Ordered.args} density="compact" />
    );
    const list = getByRole('list', { type: 'ol' });
    expect(list.className).toMatch(/compact/i);
  });
});

describe('Unordered List', () => {
  it('should render unordered list style ', () => {
    const { getByRole } = render(<Unordered {...Unordered.args} />);
    expect(getByRole('list', { type: 'ul' })).toBeTruthy();
  });
});
