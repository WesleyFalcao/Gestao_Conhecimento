import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conteudo-adicionar',
  templateUrl: './conteudo-adicionar.component.html',
  styleUrls: ['./conteudo-adicionar.component.scss']
})
export class ConteudoAdicionarComponent implements OnInit {

  /** @description Array de grupos */
  objArrayGroups: any[] = [
    {
      nm_Nome: "Ana",
      nm_Subtitulo: "subtitulos"
    },
    {
      nm_Nome: "descricao",
      nm_Subtitulo: "subtitulos"
    },
    {
      nm_Nome: "descricao",
      nm_Subtitulo: "subtitulos"
    },
    {
      nm_Nome: "descricao",
      nm_Subtitulo: "subtitulos"
    },
    {
      nm_Nome: "wesley",
      nm_Subtitulo: "subtitulos"
    },
    {
      nm_Nome: "descricao",
      nm_Subtitulo: "subtitulos"
    },
    {
      nm_Nome: "descricao",
      nm_Subtitulo: "subtitulos"
    },
    {
      nm_Nome: "descricao",
      nm_Subtitulo: "subtitulos"
    },
    {
      nm_Nome: "descricao",
      nm_Subtitulo: "subtitulos"
    },
    {
      nm_Nome: "descricao",
      nm_Subtitulo: "subtitulos"
    },
    {
      nm_Nome: "descricao",
      nm_Subtitulo: "subtitulos"
    },
    {
      nm_Nome: "descricao",
      nm_Subtitulo: "subtitulos"
    },
    {
      nm_Nome: "descricao",
      nm_Subtitulo: "subtitulos"
    },
  ]
  
  /**@description Boolean para remover a barra de pesquisa */
  b_Not_Search: boolean = true

  /**@description Título da páginas */
  ds_Titulo: string = "Adicionar conteúdo"

  nm_Label_Selection_Input: string = "Grupo"

  /**@description Nome do label do primeiro campo de imput*/
  nm_Grupo_Input: string = "Grupo"

  constructor(
    
  ) { }

  ngOnInit(): void {
  }
}
