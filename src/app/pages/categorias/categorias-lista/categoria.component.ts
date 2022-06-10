import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, HostListener, NgZone, OnInit, ViewChild } from '@angular/core';
import { filter, map, pairwise, throttleTime } from 'rxjs';
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

  /**@description boolean que fica true acima de 1034px */
  b_Width: boolean

  /** @description Recebe true quando no  final do virtual scroll*/
  b_Fim_Lista: boolean = false

  /**@description recebe a largura atual da tela */
  nr_Width: number

  /**@description Objeto com as propriedades de parâmetro para paginação */
  objCategoria = new CategoriaModel

  /**@description Recebe o valor digitado pelo usuário no desktop */
  Input_Value: any

  /**@description Recebe o array de categorias */
  obj_Array_Categorias: Array<any> = []

  /**@description Instância do virtual scroll */
  @ViewChild(CdkVirtualScrollViewport) scroller: CdkVirtualScrollViewport

  constructor(
    private categoriaService: CategoriaService,
    private subjectService: SubjectService,
    private ngZone: NgZone
  ) { }

  async ngOnInit() {
    this.onResize()
    this.Search_Categories()
  }

  ngAfterViewInit() {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(200)
    ).subscribe(() => {
      this.ngZone.run(async () => {
        if (!this.b_Fim_Lista) {

          this.objCategoria.nr_pagina++
          this.Search_Categories();
        }
      });
    })
  }

  async Search_Categories() {
    const responsecategorias = await this.categoriaService.Get_Categories_Paginator(this.objCategoria)
    if (responsecategorias.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível trazer a listagem' })
    }
    if (responsecategorias.data.categorias.length == 0) {
      this.b_Fim_Lista = true
    }
    if (this.b_Width) {
      this.obj_Array_Categorias = responsecategorias.data.categorias
      this.objCategoria.nr_registos = responsecategorias.data.categorias_aggregate.aggregate.count
    } else {
      this.obj_Array_Categorias = [...this.obj_Array_Categorias, ...responsecategorias.data.categorias]
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.nr_Width = window.innerWidth
    if (this.nr_Width >= 1023) {
      this.b_Width = true
    } else {
      this.b_Width = false
      this.objCategoria.page_lenght = 30
    }
  }

  Close_Modal() {
    this.b_Show_Filter = false
  }

  Focus_Item(el: HTMLElement) {
    el.scrollIntoView();
  }

  Filtrar() {
    this.b_Show_Filter = false
  }

  Show_Item(item) {
    item.show = !item.show
    if (item.show) {
      this.obj_Array_Categorias.forEach(fe => {
        if (item.cd_usuario != fe.cd_usuario) {
          fe.show = false
        }
      })
    }
  }

  onFilter_Search(iten) {
    this.Input_Value = iten
  }

  async onClick_Refresh() {
    this.objCategoria.nr_pagina = 1
    this.obj_Array_Categorias = []
    this.Input_Value = null
    this.b_Fim_Lista = !this.b_Fim_Lista
    if (this.b_Width == false) {
      document.getElementById('virtualscroll')?.scrollTo({ top: 0 })
    }
    this.Search_Categories()
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
      if (this.obj_Array_Categorias == undefined) {
        this.obj_Array_Categorias = []
      }
    }
  }
}
