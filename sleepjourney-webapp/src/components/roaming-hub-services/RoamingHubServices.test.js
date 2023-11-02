import React from 'react';
import { render, screen } from 'test/utils';
import { Default as RoamingHubServices } from './RoamingHubServices.stories';

describe('RoamingHubServices', () => {
  it('should render roaming hub services list', () => {
    render(<RoamingHubServices />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('should render 6 roaming hub services list items', () => {
    render(<RoamingHubServices />);
    expect(screen.getAllByRole('listitem')).toHaveLength(6);
  });
});
