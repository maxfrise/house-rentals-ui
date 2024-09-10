import { Link, useLocation } from "@remix-run/react";

import { UiCard } from "@uireact/card";
import { UiButtonLink } from "@uireact/text";
import { UiIcon } from "@uireact/icons";
import { UiFlexGrid } from "@uireact/flex";
import { UiSpacing, useViewport } from "@uireact/foundation";

import styles from './sidebar.module.css';

export const Sidebar = () => {
  const location = useLocation();
  const { isSmall } = useViewport();

  return (
    <div className={styles.container}>
      <UiSpacing padding={isSmall ? { inline: 'two' } : undefined}>
        <UiCard className={styles.sidebar} weight="50">
          <UiFlexGrid direction={isSmall ? 'row' : 'column'} gap="three">
            <UiButtonLink styling="icon" category="secondary" className={`${styles.button} ${location.pathname === '/houses' ? styles.selectedButton : ''}`}>
              <Link to='/houses'>
                <UiIcon icon="Home" inverseColoration size="large" />
              </Link>
            </UiButtonLink>
            <UiButtonLink styling="icon" category="secondary" className={`${styles.button} ${location.pathname === '/houses/new' ? styles.selectedButton : ''}`}>
              <Link to='/houses/new'>
                <UiIcon icon="Plus" inverseColoration size="large" />
              </Link>
            </UiButtonLink>
          </UiFlexGrid>
        </UiCard>
      </UiSpacing>
    </div>
  )
}