import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-adicionar',
  templateUrl: './categoria-adicionar.component.html',
  styleUrls: ['./categoria-adicionar.component.scss']
})
export class CategoriaAdicionarComponent implements OnInit {

  /**@description string que passa o nome do label do input */
  nm_Label_Input: string = "Nome da categoria"

  /**@description string que passa o título da página */
  ds_Titulo: string ="Adicionar categoria"

  constructor() { }

  ngOnInit(): void {
  }

}
