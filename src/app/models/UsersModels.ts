import { EmailValidator } from '@angular/forms';

export interface UsersModels {
  id?: number;
  name: string;
  email: EmailValidator;
  password: string;
  token?: string;
  role: number;
}
