import { UiFlexGrid } from "@uireact/flex"
import type { UiIconProps } from "@uireact/icons";
import { UiIcon } from "@uireact/icons"
import type { UiTextProps } from "@uireact/text";
import { UiText } from "@uireact/text";

export type TextIconProps = {
  icon: UiIconProps['icon'];
  text?: string | number | String;
  size?: UiTextProps['size'];
  category?: UiTextProps['category'];
}

export const TextIcon = ({ category, icon, text, size }: TextIconProps) => {
  return (
    <UiFlexGrid alignItems="center" gap="two">
      <UiIcon icon={icon} size={size} category={category} />
      <UiText size={size} category={category}>{text}</UiText>
    </UiFlexGrid>
  )
}