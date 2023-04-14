// TODO: Create a more robust validator strategy

export type Errors = {
  hasErrors: boolean;
  houseFriendlyName: string | null;
  description: string | null;
  landlordName: string | null;
  landlordPhone: string | null;
  address: string | null;
  tenantName: string | null;
  tenantPhone: string | null;
};

export default function validateForm(formData: FormData): Errors {
  const houseFriendlyName = formData.get("houseFriendlyName");
  const details = formData.get("details");
  const landlordName = formData.get("landlordName");
  const landlordPhone = formData.get("landlordPhone");
  const address = formData.get("address");
  const tenantName = formData.get("tenantName");
  const tenantPhone = formData.get("tenantPhone");
  const validState = {
    hasErrors: false,
    houseFriendlyName: null,
    description: null,
    landlordName: null,
    landlordPhone: null,
    address: null,
    tenantName: null,
    tenantPhone: null,
  };

  if (typeof houseFriendlyName !== "string" || houseFriendlyName.length === 0) {
    return {
      ...validState,
      hasErrors: true,
      houseFriendlyName: "El nombre de la casa es obligatorio",
    };
  } else if (typeof details !== "string" || details.length === 0) {
    return {
      ...validState,
      hasErrors: true,
      description: "La descripción de la propiedad es obligatorio",
    };
  } else if (typeof landlordName !== "string" || landlordName.length === 0) {
    return {
      ...validState,
      hasErrors: true,
      landlordName: "El nombre del arrendador es obligatorio",
    };
  } else if (typeof landlordPhone !== "string" || landlordPhone.length === 0) {
    return {
      ...validState,
      hasErrors: true,
      landlordPhone: "El telefono del arrendador es obligatorio",
    };
  } else if (typeof address !== "string" || address.length === 0) {
    return {
      ...validState,
      hasErrors: true,
      address: "La direccion de la casa es obligatoria",
    };
  } else if (typeof tenantName !== "string" || tenantName.length === 0) {
    return {
      ...validState,
      hasErrors: true,
      tenantName: "El nombre del arrendador es obligatorio",
    };
  } else if (typeof tenantPhone !== "string" || tenantPhone.length === 0) {
    return {
      ...validState,
      hasErrors: true,
      tenantPhone: "El telefono del arrendador es obligatorio",
    };
  } else {
    return {
      ...validState,
    };
  }
}
