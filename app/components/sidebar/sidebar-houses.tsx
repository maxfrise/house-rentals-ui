import { useRef } from 'react';

import { Link, useParams } from '@remix-run/react';
import { motion } from 'framer-motion';

import { UiReactFadeRight } from '@uireact/framer-animations';
import { UiBadge } from '@uireact/badge';
import { UiFlexGrid, UiFlexGridItem } from '@uireact/flex';
import { UiLink, UiText } from '@uireact/text';

import styles from './sidebar-houses.module.css';
import type { House } from '~/types';
import { useClickOutside } from '~/lib';

type SideBarHousesProps = {
  houses: House[];
  closeHouses: () => void;
};

export const SideBarHouses = ({ houses, closeHouses }: SideBarHousesProps) => {
  const ref = useRef(null);
  const { houseId } = useParams();
  useClickOutside(ref, closeHouses, true);

  return (
    <motion.div className={styles.container} {...UiReactFadeRight} ref={ref}>
      <UiFlexGrid direction='column' gap='two'>
        {houses && houses.length > 0 ? (
          <>
            {houses?.map((house, index) => (
              <UiLink key={`house-menu-${index}`} padding={{ inline: 'four', block: 'three' }} category='fonts' className={`${styles.houseLink} ${houseId === house.houseId ? styles.houseActive : ''}`}>
                <Link to={house.houseId} onClick={closeHouses}>
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
            ))}
          </>
        ) : (
          <UiText>Todavia no hay casas</UiText>   
        )}
      </UiFlexGrid>
    </motion.div>
  )
}