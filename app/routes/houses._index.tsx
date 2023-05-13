import { Link } from "@remix-run/react";

import { UiIcon } from '@uireact/icons';

export default function HouseIndexPage() {
  return (
    <p>
      <UiIcon id="picture" />
      Ninguna casa esta seleccionada. Selecciona una a la izquierda, o{" "}
      <Link to="new" className="text-blue-500 underline">
        agrega una nueva casa.
      </Link>
    </p>
  );
}
