import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthNamePipe'
})
export class MonthNamePipePipe implements PipeTransform {

  private months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  transform(value: number): string {
    if (value < 1 || value > 12) {
      return 'Mês Inválido';
    }
    return this.months[value - 1];
  }

}
