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
  /**@description nome do Label do selection input */
  nm_Label_Selection_Input: string = "Grupos"
  
  constructor() { }

  ngOnInit(): void {
  }

}
