import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conteudo-adicionar',
  templateUrl: './conteudo-adicionar.component.html',
  styleUrls: ['./conteudo-adicionar.component.scss']
})
export class ConteudoAdicionarComponent implements OnInit {

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
