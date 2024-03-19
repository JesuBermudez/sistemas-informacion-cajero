import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LeftOptionWithdrawComponent } from './components/option-withdraw/left-option-withdraw.component';
import { RightOptionWithdrawComponent } from './components/option-withdraw/right-option-withdraw.component';
import { BillSlotComponent } from './components/bill-slot/bill-slot.component';
import {
  auxiliar,
  bill,
  option,
  state,
} from './components/interfaces/interfaces';
import { AlertComponent } from './components/alert/alert.component';
import validation from './services/validation';
import withdraw from './services/withdraw';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LeftOptionWithdrawComponent,
    RightOptionWithdrawComponent,
    BillSlotComponent,
    AlertComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public alertComponent: auxiliar = { show: false, text: '' };
  public title: string = 'Selecciona el valor a retirar';
  public bills: bill = { show: false, bills: [] };
  public cashierState: state = { option: 'none', value: 0 };
  public buttonState: boolean[] = new Array(8).fill(true);
  public optionList: option[] = [
    { type: 'default', value: 10000 },
    { type: 'default', value: 50000 },
    { type: 'default', value: 200000 },
    { type: 'default', value: 1000000 },
    { type: 'default', value: 20000 },
    { type: 'default', value: 100000 },
    { type: 'default', value: 500000 },
    { type: 'dynamic', value: 0 },
  ];

  changeState(state: state) {
    this.cashierState = state;

    if (state.option == 'confirm') {
      let response: string = this.withdraw();
      if (response != 'continue') {
        this.cashierState = { option: 'return', value: 0 };
      } else {
        this.cashierState = { option: 'waiting', value: state.value };
        setTimeout(() => {
          this.changeState({ option: 'continue', value: state.value });
        }, 3100);
      }
    }
    this.setTitle();

    console.log(`${this.cashierState.option} - ${this.cashierState.value}`);

    this.optionList.map((op, i) => {
      switch (i) {
        case 0:
          if (['return', 'confirm'].includes(state.option)) {
            op.type = 'default';
          } else if (
            ['default', 'dynamic'].includes(this.cashierState.option)
          ) {
            op.type = 'return';
          }
          if (this.cashierState.option == 'waiting') {
            this.buttonState[i] = !this.buttonState[i];
          } else if (this.cashierState.option == 'continue') {
            this.buttonState[i] = !this.buttonState[i];
          }
          break;

        case 7:
          if (['return', 'confirm'].includes(state.option)) {
            op.type = 'dynamic';
            op.value = 0;
          } else if (
            ['default', 'dynamic'].includes(this.cashierState.option)
          ) {
            op.type = 'confirm';
            op.value = state.value;
          }
          if (this.cashierState.option == 'waiting') {
            this.buttonState[i] = !this.buttonState[i];
          } else if (this.cashierState.option == 'continue') {
            this.buttonState[i] = !this.buttonState[i];
          }
          break;

        default:
          if (
            ['return', 'continue', 'default', 'dynamic'].includes(
              this.cashierState.option
            )
          ) {
            this.buttonState[i] = !this.buttonState[i];
          }
          break;
      }
    });
  }

  changeDynamic(amount: Event) {
    this.optionList[7].value = Number(
      (amount.target as HTMLInputElement).value
    );
  }

  setTitle() {
    switch (this.cashierState.option) {
      case 'default':
        this.title = 'Confirmar retiro';
        break;
      case 'dynamic':
        this.title = 'Ingrese el monto a retirar en múltiplos de $10.000';
        break;
      case 'waiting':
        this.title = 'Por favor retire su dinero';
        break;

      default:
        this.title = 'Selecciona el valor a retirar';
        break;
    }
  }

  closeAlert() {
    this.alertComponent.show = false;
  }

  closeBills() {
    this.bills.show = false;
  }

  withdraw(): string {
    switch (validation(this.cashierState.value)) {
      case 'valid':
        this.onWithdraw();
        return 'continue';

      case 'min':
        this.alertComponent.show = true;
        this.alertComponent.text =
          'Por favor, ingrese valores desde $10.000 en adelante.';
        return 'return';
      case 'max':
        this.alertComponent.show = true;
        this.alertComponent.text =
          'Por favor, ingrese valores no mayores a $2.700.000.';
        return 'return';

      default:
        this.alertComponent.show = true;
        this.alertComponent.text =
          'Por favor, ingrese valores validos, multiplos de $10.000.';
        return 'return';
    }
  }

  onWithdraw() {
    const bills = withdraw(this.cashierState.value);
    const newBills = bills.map((n, i) => Array.from({ length: n }, () => i));

    this.bills = {
      show: true,
      bills: newBills,
    };

    console.log(this.bills);
  }
}
