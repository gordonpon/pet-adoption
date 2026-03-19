export type Species = 'Dog' | 'Cat';
export type Gender = 'Male' | 'Female';

export interface Pet {
  id: string;
  name: string;
  species: Species;
  breed: string;
  age: string;
  gender: Gender;
  personality: string;
  health: string;
  images: string[];
}
