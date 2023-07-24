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
