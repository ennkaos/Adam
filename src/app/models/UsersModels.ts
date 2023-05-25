import { EmailValidator } from '@angular/forms';

export interface UsersModels {
  isLoggedIn: boolean;
  id?: number;
  name: string;
  email: EmailValidator | string;
  password?: string;
  token?: string;
  role: number;
}
