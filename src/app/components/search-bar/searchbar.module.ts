import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchBarComponent } from './searchbar.component';

@NgModule({
    declarations: [
        SearchBarComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    exports: [
        SearchBarComponent,
    ]
})
export class SearchBarModule { }
