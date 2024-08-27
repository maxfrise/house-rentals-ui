import React from 'react';
import { Link, useParams } from '@remix-run/react';

import { UiCard } from '@uireact/card';
import type { UiSpacingProps} from '@uireact/foundation';
import { UiSpacing, UiViewport, useViewport } from '@uireact/foundation';
import { UiBadge } from '@uireact/badge';
import { UiLink, UiText } from '@uireact/text';
import { UiNavbar, UiNavbarItem } from '@uireact/navbar';
import { UiFlexGrid, UiFlexGridItem } from '@uireact/flex';

import type { House } from '../../types';
import { CardLink } from '../shared';

import styles from './navbar.module.css';

type NavbarProps = {
  houses?: House[];
}

const navbarSpacing: UiSpacingProps['margin'] = { block: 'three' };

export const Navbar: React.FC<NavbarProps> = ({ houses }: NavbarProps) => {
  const { isSmall } = useViewport();
  const { houseId } = useParams();

  return (
    <div>
      <>
        <UiViewport criteria={'m|l|xl'}>
          <CardLink icon='Home' label='Inicio' link='/houses' />
        </UiViewport>
        <UiSpacing margin={navbarSpacing}>
          <UiCard padding={{ inline: 'three', block: 'four'}} category='primary'>
            {houses && houses.length > 0 ? (
              <UiNavbar orientation='stacked' rounded='all' className={`${styles.navbar} ${isSmall ? styles.smallNavbar : ''}`}>
                {houses?.map((house, index) => (
                  <UiNavbarItem key={index} active={houseId === house.houseId}>
                    <UiLink padding={{ inline: 'four', block: 'three' }} category='fonts'>
                      <Link to={house.houseId}>
                        <UiFlexGrid alignItems='center' gap='three'>
                          <UiFlexGridItem grow={1}>
                            {`${house.houseFriendlyName} `}
                          </UiFlexGridItem>
                          <UiFlexGridItem>
                            {house.leaseStatus === 'AVAILABLE' ? (
                              <UiBadge category='warning' size='small'>Disponible</UiBadge>
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
        <UiViewport criteria={'m|l|xl'}>
          <CardLink icon='PlusSmall' label='Agregar casa' link='/houses/new' />
        </UiViewport>
      </>
    </div>
  );
};
