export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    parish: string;
    county: string;
    district: string;
    postalCode: string;
    country: string;
  };
  birthDate: string;
  baptismDate?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
}