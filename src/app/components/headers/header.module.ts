import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMeusEstudosComponent } from './header-meus-estudos/header-meus-estudos.component';
import { Header2Component } from './header2/header2.component';
import { HeaderSugestoesComponent } from './header-sugestoes/header-sugestoes.component';
import { RouterModule } from '@angular/router';
import { PopoverModule } from '../popover/popover.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderMeusEstudosComponent,
    Header2Component,
    HeaderSugestoesComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PopoverModule
  ],
  exports: [
    HeaderMeusEstudosComponent,
    Header2Component,
    HeaderSugestoesComponent,
    HeaderComponent
  ]
})
export class HeaderModule { }
