/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';
import { Default } from './SectionDividerWave.stories';

describe('Section Divider Wave', () => {
  it('should render section-divider-wave', () => {
    const { getByRole } = render(<Default {...Default.args} />);
    expect(getByRole('img')).toHaveStyle(
      `display: block; transform: rotate(0);`
    );
  });

  const align = [`top`, `bottom`];
  test.each(align)(
    'should render section-divider-wave with different align',
    (input) => {
      const { getByRole } = render(<Default {...Default.args} align={input} />);
      expect(getByRole('img').parentElement).toHaveStyle(`${input}:0px`);
    }
  );

  it('should render section-divider-wave flipped', () => {
    const { getByRole } = render(<Default {...Default.args} flipped={true} />);
    expect(getByRole('img').children[0]).toHaveStyle(`transform: scaleX(-1);`);
  });

  it('should render section-divider-wave with shadow dropped', () => {
    const { getByRole } = render(
      <Default {...Default.args} dropShadow={true} />
    );
    expect(getByRole('img').children[0]).toHaveStyle(`
    filter: drop-shadow(rgba(0, 0, 0, 0.08) 0px 30px 0px );`);
  });

  const colors = [`#F4F4F4`, `#E20613`];
  test.each(colors)(
    'should render section-divider-wave with different color',
    (input) => {
      const { getByRole } = render(<Default {...Default.args} color={input} />);
      expect(getByRole('img').children[0]).toHaveStyle(`fill:${input}`);
    }
  );

  it('should render section-divider-wave with divider', () => {
    const { getByRole } = render(
      <Default
        {...Default.args}
        divider={{
          path: 'M0,180C235.3,214.62,371.28,30,684,30c314.73,0,562.81,180,920,180,189,0,316-50,316-50V0H0Z',
          invertedPath:
            'M0,240H1920V160s-127,50-316,50C1246.81,210,998.73,30,684,30,371.28,30,235.3,214.62,0,180Z',
          viewBox: '0 0 1920 240',
          mobile: {
            path: 'M0,130V88s37.27,12,104,12c131.79,0,271-70,271-70V130Z',
            viewBox: '0 0 375 130',
          },
        }}
      />
    );
    expect(getByRole('img').children[0]).toHaveAttribute(
      'd',
      'M0,180C235.3,214.62,371.28,30,684,30c314.73,0,562.81,180,920,180,189,0,316-50,316-50V0H0Z'
    );
  });

  it('should render section-divider-wave with inverted', () => {
    const { getByRole } = render(<Default {...Default.args} inverted={true} />);
    expect(getByRole('img').children[0]).toHaveAttribute(
      'd',
      'M0,240H1920V160s-127,50-316,50C1246.81,210,998.73,30,684,30,371.28,30,235.3,214.62,0,180Z'
    );
  });
});
