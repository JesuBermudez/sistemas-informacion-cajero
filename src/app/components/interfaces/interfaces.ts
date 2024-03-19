import { Component } from '@angular/core';

export interface state {
  option: string;
  value: number;
}

export interface option {
  type: string;
  value: number;
}

export interface bill {
  show: boolean;
  bills: number[][];
}

export interface auxiliar {
  show: boolean;
  text: string;
}

export const base: number[] = [10000, 20000, 50000, 100000];
