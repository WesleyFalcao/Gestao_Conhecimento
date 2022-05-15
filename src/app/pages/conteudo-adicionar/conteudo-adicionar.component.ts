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

  /**@description Nome do label do primeiro campo de imput*/
  nm_Titulo_Input: string = "Título"

  /**@description Nome do label do primeiro campo de imput*/
  nm_Subtitulo_Input: string = "Descrição"

  /**@description Nome do label do primeiro campo de imput*/
  nm_Link_Input: string = "Link do conteúdo"

  /**@description Nome do label do primeiro campo de imput*/
  nm_Grupo_Input: string = "Grupo"

  constructor(
    
  ) { }

  ngOnInit(): void {
  }
}
