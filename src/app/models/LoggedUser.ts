export interface LoggedUser {
  id: number;
  message: string;
  token: string;
  email: string;
  name: string;
  role: number;
  materie?: string;
  serie?: string;
  grupa?: string;
}
