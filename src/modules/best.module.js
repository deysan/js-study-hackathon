import { Module } from '../core/module'

export class BestModule extends Module {
  static TYPE = 'BestModule'
  static TEXT = 'Лучшая веб-страница'

  constructor() {
    super(BestModule.TYPE, BestModule.TEXT);
  }

  trigger() {
    window.open('https://vladilen.ru/courses', '_blank');
  }
}
