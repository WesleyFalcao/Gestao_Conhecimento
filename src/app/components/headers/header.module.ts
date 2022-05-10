import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMeusEstudosComponent } from './header-meus-estudos/header-meus-estudos.component';
import { Header2Component } from './header2/header2.component';

@NgModule({
  declarations: [
    HeaderMeusEstudosComponent,
    Header2Component,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderMeusEstudosComponent,
    Header2Component,
  ]
})
export class HeaderModule { }
