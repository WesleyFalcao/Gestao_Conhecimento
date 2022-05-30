import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home/home.service';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-adicionar-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  constructor(
    private homeService: HomeService
  ){

  }

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

  onFilter_Search(iten) {
    this.Input_Value = iten
  }

  async ngOnInit() {
    const responsecategorias = await this.homeService.Get_Categorias_Listagem()
    this.obj_Array_Categorias = responsecategorias.data.categorias
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
