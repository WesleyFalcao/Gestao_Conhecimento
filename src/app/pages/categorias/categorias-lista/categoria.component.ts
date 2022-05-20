import { Component } from '@angular/core';

@Component({
  selector: 'app-adicionar-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {

  /**@description Nome do título */
  ds_Titulo: string = "Categorias"

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  /**@description Objeto que recebe o conteudo dos inputs */
  objFilter = { nr_Id: "", nm_Grupo: "", nm_Status: "" }


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

  Close_Modal() {
    this.b_Show_Filter = false
  }

  Filtrar() {
    console.log(this.objFilter)
    this.b_Show_Filter = false
  }

  Show_Modal(event) {
    this.b_Show_Filter = event
  }
}
