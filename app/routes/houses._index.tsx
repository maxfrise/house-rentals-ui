import { Link } from "@remix-run/react";

export default function HouseIndexPage() {
  return (
    <p>
      Ninguna casa esta seleccionada. Selecciona una a la izquierda, o{" "}
      <Link to="new" className="text-blue-500 underline">
        agrega una nueva casa.
      </Link>
    </p>
  );
}
