import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityName',
})
export class PriorityNamePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    if (value === 1) {
      return 'High';
    } else if (value === 2) {
      return 'Medium';
    } else if (value === 3) {
      return 'Low';
    }

    return '';
  }
}
