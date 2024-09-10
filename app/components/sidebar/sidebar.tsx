import { Link } from "@remix-run/react";

import { UiCard } from "@uireact/card";
import { UiButtonLink } from "@uireact/text";
import { UiIcon } from "@uireact/icons";

// What is the difference of this and MAXFRISE API TYPES?
import type { House } from "../../types";

import styles from './sidebar.module.css';
import { UiFlexGrid } from "@uireact/flex";
import { useCallback, useState } from "react";
import { UiButton } from "@uireact/button";
import { SideBarHouses } from "./sidebar-houses";

type SidebarProps = {
  houses: House[];
}

export const Sidebar = ({ houses }: SidebarProps) => {
  const [housesVisible, setHousesVisible] = useState(false);
  
  const closeHousesMenu = useCallback(() => {
    setHousesVisible(false);
  }, []);

  const toggleHousesMenu = useCallback(() => {
    setHousesVisible(housesVisible => !housesVisible);
  }, []);

  return (
    <div className={styles.container}>
      <UiCard className={styles.sidebar}>
        <UiFlexGrid direction="column" gap="three">
          <UiButtonLink styling="icon" category="secondary" className={styles.button}>
            <Link to='/houses' onClick={() => setHousesVisible(false)}>
              <UiIcon icon="Home" inverseColoration size="large" />
            </Link>
          </UiButtonLink>
          <UiButton styling="icon" category="secondary" className={`${styles.button} ${housesVisible ? styles.selectedButton : ''}`} onClick={toggleHousesMenu}>
            <UiIcon icon="Database" inverseColoration size="large" />
          </UiButton>
          <UiButtonLink styling="icon" category="secondary" className={styles.button}>
            <Link to='/houses/new' onClick={() => setHousesVisible(false)}>
              <UiIcon icon="Plus" inverseColoration size="large" />
            </Link>
          </UiButtonLink>
        </UiFlexGrid>
      </UiCard>
      {housesVisible && <SideBarHouses houses={houses} closeHouses={closeHousesMenu} />}
    </div>
  )
}