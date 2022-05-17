import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conteudo-editar',
  templateUrl: './conteudo-editar.component.html',
  styleUrls: ['./conteudo-editar.component.scss']
})
export class ConteudoEditarComponent implements OnInit {

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

  /**@description Título da página */
  ds_Titulo: string = "Editar conteúdo"

  /**@description nome do Label do selection input */
  nm_Label_Selection_Input: string = "Grupos"

  /**@description Nome do label do primeiro campo de imput*/
  nm_Titulo_Input: string = "Título"

  /**@description Nome do label do primeiro campo de imput*/
  nm_Subtitulo_Input: string = "Descrição"

  /**@description Nome do label do primeiro campo de imput*/
  nm_Link_Input: string = "Link do conteúdo"

  /**@description Nome do label do primeiro campo de imput*/
  nm_Grupo_Input: string = "Grupo"
  
  constructor() { }

  ngOnInit(): void {
  }

}
