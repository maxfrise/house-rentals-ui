import { Link } from "@remix-run/react";
import { UiCard } from "@uireact/card";
import { UiLink } from "@uireact/text";

export default function HouseIndexPage() {
  return (
    <UiCard>
      Information sobre las casas en renta.{' '}
      <UiLink>
        <Link to="new/">
          Agrega una nueva casa.
        </Link>
      </UiLink>
    </UiCard>
  );
}
