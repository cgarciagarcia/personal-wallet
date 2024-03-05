export interface Transactions {
  id: number;
  money: {
    amount: number;
  };
}

export interface Credentials {
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
