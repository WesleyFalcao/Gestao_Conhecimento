import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-adicionar-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  /**@description Nome do título */
  ds_Titulo: string = "Categorias"

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  /**@description Objeto que recebe o conteudo dos inputs */
  objFilter = { nr_Id: "", nm_Grupo: "", nm_Status: "" }

  /**@description Recebe o valor digitado pelo usuário no desktop */
  Input_Value: string

  /**@description Recebe o array de categorias */
  obj_Array_Categorias: any

  constructor(
    private categoriaService: CategoriaService
  ){}

  async ngOnInit() {
    this.onClick_Search()
  }

  async onClick_Search(){
    const responsecategorias = await this.categoriaService.Get_Categories_List()
    this.obj_Array_Categorias = responsecategorias.data.categorias
  }

  Close_Modal() {
    this.b_Show_Filter = false
  }

  Filtrar() {
    console.log(this.objFilter)
    this.b_Show_Filter = false
  }

  onFilter_Search(iten) {
    this.Input_Value = iten
  }

  Show_Modal(event) {
    this.b_Show_Filter = event
  }
}
