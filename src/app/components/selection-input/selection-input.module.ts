import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionInputComponent } from './selection-input.component';
import { SelectionModalComponent } from '../selection-modal/selection-modal.component';
import { ButtonModule } from '../button/button.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterModule } from 'src/app/pipes/filter/filter.module';

@NgModule({
  declarations: [
    SelectionInputComponent,
    SelectionModalComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FilterModule
  ],
  
  exports: [
    SelectionInputComponent,
    SelectionModalComponent
  ]
})
export class SelectionInputModule { }
