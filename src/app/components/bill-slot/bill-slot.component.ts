import { ShowBillsComponent } from './../show-bills/show-bills.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'bill-slot',
  standalone: true,
  imports: [ShowBillsComponent],
  template: `
    <section class="absolute my-10 -mx-40 w-80 h-24 bg-slate-700">
      <div
        class="w-4/5 mx-auto border-b-8 border-green-200 text-center text-3xl font-bold"
      >
        CASH
      </div>
      <div id="bill-slot" class="w-4/5 h-6 mx-auto mt-3 bg-slate-500 "></div>
    </section>
  `,
  styleUrl: './bill-slot.component.css',
})
export class BillSlotComponent {}
