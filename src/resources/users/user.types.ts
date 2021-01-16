export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface LoginInputDto {
  email: string;
  password: string;
}
