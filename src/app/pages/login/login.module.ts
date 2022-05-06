import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ButtonModule } from 'src/app/components/button/button.module';
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule
    ],
    providers: [],
})
export class LoginModule { }
