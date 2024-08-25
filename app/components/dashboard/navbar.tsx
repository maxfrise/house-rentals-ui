import React from 'react';
import { Link, useParams } from '@remix-run/react';

import { UiCard } from '@uireact/card';
import type { UiSpacingProps} from '@uireact/foundation';
import { UiSpacing, UiViewport } from '@uireact/foundation';
import { UiBadge } from '@uireact/badge';
import { UiLink, UiText } from '@uireact/text';
import { UiNavbar, UiNavbarItem } from '@uireact/navbar';
import { UiFlexGrid, UiFlexGridItem } from '@uireact/flex';

import type { House } from '../../types';
import { AddHouseButton, HomeButton } from './buttons';

type NavbarProps = {
  houses?: House[];
}

const navbarSpacing: UiSpacingProps['margin'] = { block: 'three' };
const linkSpacing: UiSpacingProps['padding'] = { block: 'two' };

export const Navbar: React.FC<NavbarProps> = ({ houses }: NavbarProps) => {
  const { houseId } = useParams();

  return (
    <div>
      <>
        <UiViewport criteria={'l|xl'}>
          <UiCard>
            <HomeButton padding={linkSpacing} />
          </UiCard>
        </UiViewport>
        <UiSpacing margin={navbarSpacing}>
          <UiCard padding={{}}>
            {houses && houses.length > 0 ? (
              <UiNavbar orientation='stacked' rounded='edges'>
                {houses?.map((house, index) => (
                  <UiNavbarItem key={index} active={houseId === house.houseId}>
                    <UiLink>
                      <Link to={house.houseId}>
                        <UiFlexGrid>
                          <UiFlexGridItem grow={1}>
                            {`${house.houseFriendlyName} `}
                          </UiFlexGridItem>
                          <UiFlexGridItem>
                            {house.leaseStatus === 'AVAILABLE' ? (
                              <UiBadge category='primary' size='small'>Disponible</UiBadge>
                            ) : (
                              <UiBadge category='positive' size='small'>Rentada</UiBadge>
                            )}
                          </UiFlexGridItem>
                        </UiFlexGrid>
                      </Link>
                    </UiLink>
                  </UiNavbarItem>
                ))}
              </UiNavbar>
            ) : (
            <UiText>Todavia no hay casas</UiText>   
            )}
          </UiCard>
        </UiSpacing>
        <UiViewport criteria={'l|xl'}>
          <UiCard>
            <AddHouseButton padding={linkSpacing} />
          </UiCard>
        </UiViewport>
      </>
    </div>
  );
};
