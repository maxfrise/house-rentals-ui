import React from 'react';

import { Link } from '@remix-run/react';

import { UiCard } from '@uireact/card';
import type { UiSpacingProps} from '@uireact/foundation';
import { TextSize, UiSpacing } from '@uireact/foundation';
import { UiReactHoverElevate } from '@uireact/framer-animations';
import { UiButtonLink, UiHeading, UiText } from '@uireact/text';
import { UiFlexGrid, UiFlexGridItem } from '@uireact/flex';

import styles from './account-selector.module.css';

const imageMargin: UiSpacingProps['margin'] = { block: 'six' };
const titlePadding: UiSpacingProps['padding'] = { top: 'five' };
const textMargin: UiSpacingProps['margin'] = { bottom: 'four' };

export const IndividualAccountSelector = () => {
  return (
    <UiCard className={styles.selectorCard} padding={{}} category='primary' motion={UiReactHoverElevate}>
      <UiButtonLink styling='clear' category='primary' className={styles.linkWrapper}>
        <Link to="individual">
          <UiFlexGrid direction='column' className='full-height' justifyContent='center' alignItems='stretch'>
            <UiFlexGridItem grow={1}>
              <UiSpacing padding={titlePadding}>
                <UiHeading centered>Individual</UiHeading>
              </UiSpacing>
            </UiFlexGridItem>
            <UiFlexGridItem grow={1}>
              <UiSpacing margin={imageMargin}>
                <img src="/_static/real-estate.png" alt="individual-logo" aria-hidden className={`${styles.realStateSticker} centered`} />
              </UiSpacing>
            </UiFlexGridItem>
            <UiSpacing margin={textMargin}>
              <UiText size={TextSize.small}>Cuenta para personas individuales que necesitan administrar sus propiedades.</UiText>
            </UiSpacing>
          </UiFlexGrid>
        </Link>
      </UiButtonLink>
    </UiCard>
  );
};
