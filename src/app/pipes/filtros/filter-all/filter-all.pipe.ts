import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter-all',
    pure: false
})
export class FilterAllPipe implements PipeTransform {
    transform(items: any[], filter: string): any {
        if (!items || !filter) {
            return items;
        }

        filter = filter.toString()

        return items.filter(item => JSON.stringify(item).toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
}