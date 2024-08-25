import { Link } from "@remix-run/react";
import { UiCard } from "@uireact/card";
import { UiFlexGrid, UiFlexGridItem } from "@uireact/flex";
import { UiSpacing } from "@uireact/foundation";
import { UiIcon, type UiIconProps } from "@uireact/icons";
import { UiLink, UiText } from "@uireact/text";

type CardLinkProps = {
  link: string;
  label: string;
  icon: UiIconProps['icon'];
};

export const CardLink = ({ link, label, icon }: CardLinkProps) => (
  <UiCard category='primary' padding={{}}>
    <UiLink className='cover' padding={{ block: 'three' }}>
      <Link to={link}>
        <UiSpacing padding={{ inline: 'four' }}>
          <UiFlexGrid alignItems='center' gap='three'>
            <UiIcon icon={icon} category='secondary' /> 
            <UiFlexGridItem>
              <UiText category='secondary' fontStyle='bold'>{label}</UiText>
            </UiFlexGridItem>
          </UiFlexGrid>
        </UiSpacing>
      </Link>
    </UiLink>
  </UiCard>
);