type Landlord = {
  landlordName: string;
  landlordPhone: String;
};

type Tenant = {
  tenantName: string;
  tenantPhone: String;
};

export type House = {
  landlords: Landlord[];
  tenants: Tenant[];
  houseId: string;
  houseFriendlyName: string;
  landlord: string;
  address: string;
  details: string;
  leaseStatus: string;
};
