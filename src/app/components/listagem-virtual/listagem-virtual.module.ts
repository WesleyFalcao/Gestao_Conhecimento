import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemVirtualComponent } from './listagem-virtual.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    ListagemVirtualComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule
  ],
  exports: [
    ListagemVirtualComponent
  ]
})
export class ListagemVirtualModule { }
