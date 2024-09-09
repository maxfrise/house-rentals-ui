import { UiCard } from "@uireact/card";
import { UiFlexGrid, UiFlexGridItem } from "@uireact/flex";
import { UiText } from "@uireact/text";
import type { House } from "~/api/types";

import styles from './houses-info.module.css';
import { UiSpacing } from "@uireact/foundation";
import { UiIcon } from "@uireact/icons";
import { TextIcon } from "~/components/shared";

type HousesInformationProps = {
  house: House;
}

export const HousesInformation = ({ house }: HousesInformationProps) => {
  return (
    <UiSpacing padding={{ block: 'three' }}>
      <UiFlexGrid gap="three" wrap="wrap">
        <UiFlexGridItem grow={1}>
          <UiCard category="primary" className={styles.houseInfoCard} weight="50">
          <UiFlexGrid alignItems="center" gap="two">
              <UiIcon icon="Home" size="large" category="secondary"/>
              <UiText fontStyle="bold" size="large" category="secondary">{house.houseFriendlyName}</UiText>
            </UiFlexGrid>
            <UiSpacing padding={{ top: 'two' }}>
              <TextIcon icon="Info" text={house.details} />
            </UiSpacing>
          </UiCard>
        </UiFlexGridItem>
        <UiFlexGridItem grow={1}>
          <UiCard category="primary" className={styles.houseInfoCard} weight="50">
            <UiFlexGrid alignItems="center" gap="two">
              <UiIcon icon="UserCrown" size="large" category="secondary"/>
              <UiText fontStyle="bold" size="large" category="secondary">Propietario</UiText>
            </UiFlexGrid>
            <UiSpacing padding={{ top: 'two' }}>
              <UiFlexGrid direction="column" gap="two">
                <TextIcon icon="User" text={house.landlords[0].name} />
                <TextIcon icon="CirclePhone" text={house.landlords[0].phone} />
              </UiFlexGrid>
            </UiSpacing>
          </UiCard>
        </UiFlexGridItem>
        <UiFlexGridItem grow={1}>
          <UiCard category="primary" className={styles.houseInfoCard} weight="50">
            <UiFlexGrid alignItems="center" gap="two">
              <UiIcon icon="Briefcase" size="large" category="secondary" />
              <UiText fontStyle="bold" size="large" category="secondary">Arrendatario</UiText>
            </UiFlexGrid>
            <UiSpacing padding={{ top: 'two' }}>
              <UiFlexGrid direction="column" gap="two">
                <TextIcon icon="User" text={house.landlords[0].name} />
                <TextIcon icon="CirclePhone" text={house.landlords[0].phone} />
              </UiFlexGrid>
            </UiSpacing>
          </UiCard>
        </UiFlexGridItem>
      </UiFlexGrid>
    </UiSpacing>
  )
};
