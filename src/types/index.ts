export type Animal = {
  animalId: number;
  type: string;
  memo: null | string;
  parts: number;
  animalDetails: [];
};
export type RegisterAnimalData = {
  type: number;
  number: number;
  partPrice: string;
  desc: string;
};
export type HomeCount =
  | [
      {
        label: string;
        quantity: number;
      }
    ]
  | [];
export type DealingData = {
  Name: string;
  Contact: string;
  EmergencyContact: string;
  Address: string;
  Nic: string;
  Descrption: string;
  QurbaniDay: number;
  PartId: number;
  AdId: number;
};

export type AvailableAnimalsForDeal =
  | [
      {
        adId: number;
        number: number;
        parts: number[] | [];
      }
    ]
  | [];
