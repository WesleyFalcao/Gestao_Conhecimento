import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '../button/button.module';
import { AlertModalComponent } from './alert-modal.component';

@NgModule({
    declarations: [
        AlertModalComponent
    ],
    imports: [
        CommonModule,
        ButtonModule,
    ],
    providers: [],
    exports: [
        AlertModalComponent,
    ]
})
export class AlertModalModule { }
