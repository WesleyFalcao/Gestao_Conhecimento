import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilterAllPipe } from './filter-all/filter-all.pipe';
import { FilterPipe } from './filter/filter.pipe';

@NgModule({
    declarations: [
        FilterPipe,
        FilterAllPipe
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        FilterPipe,
        FilterAllPipe
    ]
})
export class FilterModule { }
