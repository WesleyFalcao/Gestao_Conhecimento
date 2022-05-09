import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { PaginatorComponent } from './paginator.component';

@NgModule({
    declarations: [
        PaginatorComponent
    ],
    imports: [
        CommonModule,
        NzPopoverModule,
    ],
    exports: [
        PaginatorComponent
    ],
})
export class PaginatorModule { }
