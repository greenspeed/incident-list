import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityImage',
})
export class PriorityImagePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): string {
    if (value === 1) {
      return 'assets/alarm-high.svg';
    } else if (value === 2) {
      return 'assets/alarm-medium.svg';
    }

    return 'assets/alarm-low.svg';
  }
}
