import { Alert } from './alert';

export class FixedDeposit {
  id: number;
  depositAmount: number;
  maturityAmount: number;
  period: number;
  interestRate: number;
  bank: string;
  depositDate: string;
  maturityDate: string;
  name: string;
  nomineeName: string;
  email: String;
  phoneNumber: String;
  username: string;
  alertid: number;
  alert: Alert;
}