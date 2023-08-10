export type Animal = {
  animalId: number;
  type: string;
  memo: null | string;
  parts: number;
  animalDetails: [];
};
export type RegisterAnimalData = {
  type: number | string;
  number: number | string;
  partPrice: string;
  desc: string;
};
export type HomeCount = {
  allAnimals:
    | [
        {
          label: string;
          quantity: number;
        }
      ]
    | [];
  animalsForRegistration: Animal[];
  animalNumberAvailableForRegisteration: number[];
  responses: {
    status: string;
    message: string;
    tokenValidated: boolean;
  };
};
export type DealingData = {
  Name: string;
  Contact: string;
  EmergencyContact: string;
  Address: string;
  Nic: string;
  Description: string;
  QurbaniDay: number | string;
  PartId: number | string;
  AdId: number | string;
};

export type AvailableAnimalsForDeal =
  | [
      {
        adId: number;
        price: number;
        number: number;
        parts: number[] | [];
      }
    ]
  | [];

export type NicData = {
  name: string;
  contact: string;
  emergencyContact: string;
  address: string;
  nic: string;
  adId: number;
  partId: number;
  qurbaniDay: number;
  description: string;
  dealId: number;
  pickedUp: boolean;
  personId: number;
  price: number;
  finalPrice: number;
  animalType: string;
  number: number;
};

export type LoginValueState = {
  email: string;
  password: string;
};

export type RegisterValueState = {
  email: string;
  password: string;
  cpassword: string;
  name: string;
};
