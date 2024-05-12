import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleLabel'
})
export class RoleLabelPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.substring(5);
  }

}
