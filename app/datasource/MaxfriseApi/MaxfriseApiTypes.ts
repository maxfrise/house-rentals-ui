type Landlord = {
  name: string;
  phone: String;
};

type Tenant = {
  name: string;
  phone: String;
};

type Detail = {
  amount: string;
};

type Payment = {
  landlords: Landlord[];
  status: string;
  tenants: Tenant[];
  details: Detail[];
  pk: string;
};

export type InitLeaseRequest = {
  user: string;
  houseid: string;
  startDate: string;
  term: string;
  rentAmount: string;
  landlords: Landlord[];
  tenants: Tenant[];
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

export type HouseOverview = {
  house: House;
  payments: Payment[];
};
