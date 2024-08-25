import { Link } from '@remix-run/react';

import { UiLink } from '@uireact/text';
import { UiIcon } from '@uireact/icons';
import { UiFlexGrid, UiFlexGridItem } from '@uireact/flex';

import styles from './navbar.module.css';

export const FooterActions = () => (
  <div className={styles.footerNavbar}>
    <UiFlexGrid alignItems='center'>
      <UiFlexGridItem grow={1}>
        <UiLink className={styles.smallNavbarActions}>
          <Link to="/houses">
            <UiIcon icon="Home" />
          </Link>
        </UiLink>
      </UiFlexGridItem>
      <UiFlexGridItem grow={1}>
        <UiLink className={styles.smallNavbarActions}>
          <Link to="/houses/new">
            <UiIcon icon="PlusSmall" />
          </Link>
        </UiLink>
      </UiFlexGridItem>
    </UiFlexGrid>
  </div>
);