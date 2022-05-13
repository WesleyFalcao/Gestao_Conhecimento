import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { DynamicPipe } from './dynamic.pipe';

@NgModule({
    declarations: [
        DynamicPipe
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        DynamicPipe
    ],
    providers: [
        CurrencyPipe,
    ]
})
export class DynamicModule { }
