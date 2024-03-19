import { base } from '../components/interfaces/interfaces';

export default function withdraw(amount: number): number[] {
  var bills: number[] = [0, 0, 0, 0];
  let adder: number = 0;
  let carrier: number = 0;

  for (var i = 0; adder != amount; i++) {
    if (base[i] && adder + base[i] <= amount) {
      adder += base[i];
      bills[i]++;
    } else {
      carrier = (carrier + 1) % 4;
      i = carrier - 1;
    }
  }

  return bills;
}
