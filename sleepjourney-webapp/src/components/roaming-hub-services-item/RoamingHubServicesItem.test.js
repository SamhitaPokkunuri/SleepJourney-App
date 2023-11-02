import React from 'react';
import { render, screen } from 'test/utils';
import RoamingHubServicesItem from './RoamingHubServicesItem';

describe('RoamingHubServices', () => {
  const roamingHubServicesItemProps = {
    heading: 'Hub members',
    networks: 184,
    countries: 129,
  };

  it('should render heading', () => {
    render(<RoamingHubServicesItem {...roamingHubServicesItemProps} />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('should render networks', () => {
    render(<RoamingHubServicesItem {...roamingHubServicesItemProps} />);
    expect(screen.getByText('184')).toBeInTheDocument();
    expect(screen.getByText('Networks')).toBeInTheDocument();
  });

  it('should render countries', () => {
    render(<RoamingHubServicesItem {...roamingHubServicesItemProps} />);
    expect(screen.getByText('129')).toBeInTheDocument();
    expect(screen.getByText('Countries')).toBeInTheDocument();
  });
});
