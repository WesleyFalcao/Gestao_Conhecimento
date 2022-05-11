import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderMeusEstudosComponent } from './header-meus-estudos/header-meus-estudos.component';
import { Header2Component } from './header2/header2.component';
import { HeaderSugestoesComponent } from './header-sugestoes/header-sugestoes.component';
import { RouterModule } from '@angular/router';
import { HeaderAdmComponent } from './header-adm/header-adm.component';

@NgModule({
  declarations: [
    HeaderMeusEstudosComponent,
    Header2Component,
    HeaderSugestoesComponent,
    HeaderAdmComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    HeaderMeusEstudosComponent,
    Header2Component,
    HeaderSugestoesComponent,
    HeaderAdmComponent, 
  ]
})
export class HeaderModule { }
