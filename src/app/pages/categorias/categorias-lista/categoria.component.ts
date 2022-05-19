import { Component} from '@angular/core';

@Component({
  selector: 'app-adicionar-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {

  /**@description Nome do título */
  ds_Titulo: string = "Categorias"

  /**@description Recebe o valor digitado pelo usuário no desktop */
  Input_Value: string

  obj_Array_Categorias: any = [
    {
      nome: "CEDUSC",
      id: 1,
      usuario: "wesleyfa",
      perfil: "wesleyfa",
      status: "ativo",
      b_iten: true
    },
    {
      nome: "COMPLICE",
      id: 2,
      usuario: "brunop",
      perfil: "brunop",
      status: "ativo",
      b_iten: true
    },
  ]

  onFilter_Search(iten) {
    this.Input_Value = iten
  }
}
