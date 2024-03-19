import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-show-bills',
  standalone: true,
  imports: [],
  templateUrl: './show-bills.component.html',
  styleUrl: './show-bills.component.css',
})
export class ShowBillsComponent {
  @Input({ required: true }) bills!: number[][];
  public imgs: string[][] = [
    ['assets/anverso10000.png', 'Billete de 10k'],
    ['assets/anverso20000.png', 'Billete de 20k'],
    ['assets/anverso50000.png', 'Billete de 50k'],
    ['assets/anverso100000.png', 'Billete de 100k'],
  ];
}
