import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-adicionar',
  templateUrl: './categoria-adicionar.component.html',
  styleUrls: ['./categoria-adicionar.component.scss']
})
export class CategoriaAdicionarComponent implements OnInit {
  
  /**@description string que passa o título da página */
  ds_Titulo: string ="Adicionar categoria"

  /**@description Boolean para remover a barra de pesquisa */
  b_Not_Search: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

}
