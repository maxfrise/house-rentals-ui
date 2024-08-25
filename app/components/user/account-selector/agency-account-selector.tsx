import { Link } from '@remix-run/react';

import { UiCard } from '@uireact/card';
import { UiFlexGrid, UiFlexGridItem } from '@uireact/flex';
import type { UiSpacingProps} from '@uireact/foundation';
import { UiSpacing, TextSize } from '@uireact/foundation';
import { UiReactHoverElevate } from '@uireact/framer-animations';
import { UiButtonLink, UiHeading, UiText } from '@uireact/text';

import styles from './account-selector.module.css';

const imageMargin: UiSpacingProps['margin'] = { block: 'six' };
const titlePadding: UiSpacingProps['padding'] = { block: 'five' };
const textMargin: UiSpacingProps['margin'] = { bottom: 'four' };

export const AgencyAccountSelector = () => {
  return (
    <UiCard className={styles.selectorCard} padding={{}} category='primary' motion={UiReactHoverElevate}>
      <UiButtonLink styling='clear' category='primary' className={styles.linkWrapper}>
        <Link to="agency">
          <UiFlexGrid direction='column' className='full-height' justifyContent='center' alignItems='stretch'>
            <UiFlexGridItem grow={1}>
              <UiSpacing padding={titlePadding}>
                <UiHeading centered>Inmobiliaria</UiHeading>
              </UiSpacing>
            </UiFlexGridItem>
            <UiFlexGridItem grow={1}>
              <UiSpacing margin={imageMargin}>
                <img src="/_static/real-estate-graphs.png" alt="inmobiliaria-logo" aria-hidden className={`${styles.realStateSticker} centered`} />
                <UiFlexGrid alignItems='center' justifyContent='center'>
                  <img src="/_static/real-estate-deal.png" alt="inmobiliaria-logo" aria-hidden className={styles.realStateSticker} />
                  <img src="/_static/real-estate-key.png" alt="inmobiliaria-logo" aria-hidden className={styles.realStateSticker} />
                </UiFlexGrid>
              </UiSpacing>
            </UiFlexGridItem>
            <UiSpacing margin={textMargin}>
              <UiText size={TextSize.small}>Cuenta para inmobiliarias que requieren un perfil empresarial y cuentas individuales para los agentes inmobiliarios.</UiText>
            </UiSpacing>
          </UiFlexGrid>
        </Link>
      </UiButtonLink>
    </UiCard>
  );
};