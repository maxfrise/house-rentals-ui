import { UiCard } from "@uireact/card";
import { UiLink } from "@uireact/text";

export default function HouseIndexPage() {
  return (
    <UiCard>
      Information sobre las casas en renta.{' '}
      <UiLink href="new/" useReactLink>
        Agrega una nueva casa.
      </UiLink>
    </UiCard>
  );
}
