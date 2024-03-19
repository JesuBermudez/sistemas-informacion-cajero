import { Component, EventEmitter, Input, Output } from '@angular/core';
import { option, state } from '../interfaces/interfaces';

@Component({
  selector: 'right-option-withdraw',
  standalone: true,
  imports: [],
  template: `
    <div
      class="hover:bg-gray-500/30 rounded cursor-pointer p-1 flex justify-end gap-8"
      [class]="!enabled ? 'pointer-events-none' : ''"
      (click)="setState()"
    >
      @if (enabled) {
      <div class="w-auto px-2 py-2">
        @switch (value.type) { @case ("default") { \${{
          value.value.toLocaleString()
        }}
        } @case ("dynamic") { Valor diferente } @case ("confirm") { Confirmar }
        }
      </div>
      }
      <div
        class="relative border-double border-4 border-gray-500/40 rounded w-12 py-5 bg-slate-400/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="absolute top-0 right-1 w-10 h-10 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </div>
    </div>
  `,
})
export class RightOptionWithdrawComponent {
  @Input({ required: true }) value!: option;
  @Input({ required: true }) enabled!: boolean;
  @Output() state = new EventEmitter<state>();

  setState() {
    this.state.emit({ option: this.value.type, value: this.value.value });
  }
}
