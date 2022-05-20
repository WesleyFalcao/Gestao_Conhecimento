import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adicionar-grupo',
  templateUrl: './adicionar-grupo.component.html',
  styleUrls: ['./adicionar-grupo.component.scss']
})
export class AdicionarGrupoComponent implements OnInit {

  /**@description string que passa o título da página */
  ds_Titulo: string = "Adicionar grupo"

  /**@description Boolean para remover a barra de pesquisa */
  b_Not_Search: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

}
