import { Component, NgZone, OnInit } from '@angular/core';
import { CategoriaModel } from 'src/app/models/categoria/categoria.model';
import { SubjectService } from 'src/app/services/subject.service';
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

  /**@description Objeto com as propriedades de parâmetro para paginação */
  objCategoria = new CategoriaModel

  /**@description Recebe o valor digitado pelo usuário no desktop */
  Input_Value: string

  /**@description Recebe o array de categorias */
  obj_Array_Categorias: Array<any>

  constructor(
    private categoriaService: CategoriaService,
    private subjectService: SubjectService,
    private ngZone: NgZone
  ){}

  async ngOnInit() {
    this.onClick_Search()
  }

  async onClick_Search(){
    const responsecategorias = await this.categoriaService.Get_Categories_Paginator(this.objCategoria)
    this.obj_Array_Categorias = responsecategorias.data.categorias
    this.objCategoria.nr_registos = responsecategorias.data.categorias_aggregate.aggregate.count
  }

  Close_Modal() {
    this.b_Show_Filter = false
  }

  Filtrar() {
    console.log(this.objCategoria)
    this.b_Show_Filter = false
  }

  onFilter_Search(iten) {
    this.Input_Value = iten
  }

  Show_Modal(event) {
    this.b_Show_Filter = event
  }

  /** @description Avança uma pagina */
  async Mudar_Pagina(nr_Pagina: number) {
    this.objCategoria.nr_pagina = nr_Pagina
    const responseusuarios = await this.categoriaService.Get_Categories_Paginator(this.objCategoria)
    if (responseusuarios.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível trazer a listagem' })
    } else {
      this.obj_Array_Categorias = responseusuarios.data.categorias
      if(this.obj_Array_Categorias == undefined){
        this.obj_Array_Categorias = []
      }
    }
  }
}
