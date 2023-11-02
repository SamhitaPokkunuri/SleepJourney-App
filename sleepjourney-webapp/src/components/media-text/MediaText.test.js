/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';
import { Default } from './MediaText.stories';

describe('Media Text', () => {
  it('should render media-text', () => {
    const { getByRole, getAllByRole } = render(<Default {...Default.args} />);
    expect(getByRole('grid')).toHaveClass('MuiGrid-container');
    expect(getByRole('grid').children).toHaveLength(2);
    getAllByRole('gridcell').forEach((column) => {
      expect(column).toHaveClass('MuiGrid-grid-sm-6');
    });
  });

  it('should render media-text first column data', () => {
    const { getByRole, getByText } = render(<Default {...Default.args} />);
    expect(getByRole('heading').textContent).toMatch(/Test title/i);
    expect(getByText(/Test description/i).className).toMatch(/body/i);
    expect(getByRole('button', { name: 'Test Button' }));
  });

  it('should render media-text second column data', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('img')).toBeInTheDocument();
    expect(getByRole('img')).toHaveAttribute(
      'alt',
      'The connected consumer 2030'
    );
  });

  it('should render media-text image with badge', () => {
    render(
      <Default
        {...Default.args}
        badge={{
          color: 'rgb(230, 0, 0)',
          hasImageBadge: true,
          hideImageMobile: true,
        }}
      />
    );
    expect(document.querySelector('#Primary_Badge')).toBeInTheDocument();
    expect(document.querySelector('#Primary_Badge').parentElement).toHaveStyle(
      `color: rgb(230, 0, 0)`
    );
  });

  const align = [
    ['top', 'flex-start'],
    ['center', 'center'],
    ['bottom', 'flex-end'],
  ];
  test.each(align)(
    'should render media-text column with self-align property',
    (input, expected) => {
      const { getByRole } = render(<Default {...Default.args} align={input} />);
      expect(getByRole('grid')).toHaveStyle(`align-items: ${expected}`);
    }
  );

  it('should render media-text image caption', () => {
    const { getByText } = render(
      <Default {...Default.args} caption="Testing Caption" />
    );
    expect(getByText(/Testing Caption/i)).toBeInTheDocument();
    expect(getByText(/Testing Caption/i)).toHaveClass('MuiTypography-root');
  });

  it('should render media-text image mask', () => {
    render(
      <Default
        {...Default.args}
        imageMask={{
          hasImageMask: true,
          svgImageMask: {
            color: 'rgb(230, 0, 0)',
          },
        }}
      />
    );
    expect(document.querySelector('svg')).toBeTruthy;
    expect(document.querySelector('svg')).toHaveStyle(`color: rgb(230, 0, 0)`);
  });

  const columns = [
    ['half', 50, 50],
    ['seven-five', 70, 30],
    ['eight-four', 75, 25],
  ];
  test.each(columns)(
    'should render media-text column with diffrent sizes',
    (input, firstValue, secondValue) => {
      const { getByRole } = render(
        <Default {...Default.args} columns={input} />
      );

      expect(getByRole('grid').firstChild).toHaveClass(
        `MuiGrid-grid-sm-${Math.round((secondValue / 100) * 12)}`
      );
      expect(getByRole('grid').lastChild).toHaveClass(
        `MuiGrid-grid-sm-${Math.round((firstValue / 100) * 12)}`
      );
    }
  );

  const mediaPosition = [
    ['left', 1],
    ['right', 2],
  ];
  test.each(mediaPosition)(
    'should render media-text column diffrent order',
    (input, expected) => {
      const { getByRole } = render(
        <Default
          {...Default.args}
          mediaPosition={{
            desktop: input,
          }}
        />
      );
      expect(getByRole('grid').firstChild).toHaveStyle(`order:${expected}`);
    }
  );
});
