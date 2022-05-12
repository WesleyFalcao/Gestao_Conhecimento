import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria-editar',
  templateUrl: './categoria-editar.component.html',
  styleUrls: ['./categoria-editar.component.scss']
})
export class CategoriaEditarComponent implements OnInit {

  /**@description string que passa o noe do label do input */
  nm_Label_Input: string = "Nome da categoria"

  constructor() { }

  ngOnInit(): void {
  }

}
