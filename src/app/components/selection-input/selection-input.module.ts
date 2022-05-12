import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterModule } from 'src/app/pipes/filter/filter.module';
import { ButtonModule } from '../button/button.module';
import { SelectionInputComponent } from './selection-input.component';
import { SelectionModalComponent } from './selection-modal/selection-modal.component';

@NgModule({
    declarations: [
        SelectionInputComponent,
        SelectionModalComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        FilterModule,
    ],
    exports: [
        SelectionInputComponent,
        SelectionModalComponent
    ],
})
export class SelectionInputModule { }
