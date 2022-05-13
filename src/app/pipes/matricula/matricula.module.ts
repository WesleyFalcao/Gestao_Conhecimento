import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatriculaPipe } from './matricula.pipe';

@NgModule({
    declarations: [
        MatriculaPipe
    ],
    imports: [
        CommonModule,
    ], providers: [
        MatriculaPipe
    ],
    exports: [
        MatriculaPipe
    ]
})
export class MatriculaModule { }
