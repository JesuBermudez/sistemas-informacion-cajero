import { base } from '../components/interfaces/interfaces';

export default function validation(amount: number): string {
  if (amount < base[0]) return 'min'; // Valor menor a 10k

  if (amount > 2700000) return 'max'; // Valor menor a 10k

  if ((amount / 5000) % 2 != 0) return 'invalid'; // Valor invalido

  return 'valid';
}
