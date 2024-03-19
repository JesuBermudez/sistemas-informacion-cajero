import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  @Input({ required: true }) text!: string;
  @Input({ required: true }) close!: void;
}
