import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoriaeditar',
  templateUrl: './categoria-editar.component.html',
  styleUrls: ['./categoria-editar.component.scss']
})
export class CategoriaEditarComponent implements OnInit {

  /**@description string que passa o noe do label do input */
  nm_Label_Input: string = "Nome da categoria"

  /**@description string que passa o título da página */
  ds_Titulo: string = "Editar categoria"

  constructor() { }

  ngOnInit(): void {
  }

}
