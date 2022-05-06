import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IMaskModule } from 'angular-imask';
import { TextMaskModule } from 'angular2-text-mask';
import { InputComponent } from './input.component';

@NgModule({
    declarations: [
        InputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        IMaskModule,
    ],
    exports: [
        InputComponent
    ],
})
export class InputModule { }
