/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from 'test/utils';

import { Default } from './Audio.stories';

describe('Audio', () => {
  it('should get source auudio', () => {
    const { getByRole } = render(<Default {...Default.args} />);

    expect(getByRole('figure').firstChild).toHaveAttribute(
      'src',
      'https://content-staging.vodafone.com/sites/default/files/2020-11/DVA_ep2_v2.mp3'
    );
  });
});
