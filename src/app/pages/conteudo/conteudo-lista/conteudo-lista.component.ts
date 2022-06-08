import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, ElementRef, HostListener, NgZone, OnInit, ViewChild } from '@angular/core';
import { filter, map, pairwise, throttleTime } from 'rxjs';
import { ConteudoModel } from 'src/app/models/conteudo/conteudo.model';
import { SubjectService } from 'src/app/services/subject.service';
import { ConteudoService } from '../conteudo.service';

@Component({
  selector: 'app-conteudo-lista',
  templateUrl: './conteudo-lista.component.html',
  styleUrls: ['./conteudo-lista.component.scss']
})
export class ConteudoEditarListaComponent implements OnInit {

  /**@description Título da página */
  ds_Titulo: string = "Conteúdos"

  /**@description recebe a largura atual da tela */
  nr_Width: number

  /**@description boolean que fica true acima de 1034px */
  b_Width: boolean

  /** @description Recebe true quando no  final do virtual scroll*/
  b_Fim_Lista: boolean = false

  /**@description Recebe o valor digitado pelo usuário no desktop */
  Input_Value: string

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  /**@description Recebe o array de conteudos */
  obj_Array_Conteudos: Array<any> = []

  /**@description Objeto de conteduos*/
  objConteudo = new ConteudoModel

  /**@description Instância do virtual scroll */
  @ViewChild (CdkVirtualScrollViewport) scroller: CdkVirtualScrollViewport

  constructor(
    private conteudoService: ConteudoService,
    private subjectService: SubjectService,
    private ngZone: NgZone
  ) { }

  async ngOnInit() {
    this.Search_Conteudos()
    this.onResize()
  }

  ngAfterViewInit(){
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(200)
    ).subscribe(() => {
      this.ngZone.run(async () => {
        if (!this.b_Fim_Lista) {
          this.objConteudo.nr_pagina++
          this.Search_Conteudos();
        }
      });
    })
  }

  @HostListener('window:resize')
  onResize() {
    this.nr_Width = window.innerWidth
    if (this.nr_Width >= 1023) {
      this.b_Width = true
    } else {
      this.b_Width = false
      this.objConteudo.page_lenght = 30
    }
  }

  async Search_Conteudos() {
    const responseconteudo = await this.conteudoService.Get_Conteudos(this.objConteudo)
    if(responseconteudo.errors){
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível trazer a listagem' })
    }
    if (responseconteudo.data.conteudos.length == 0) {
      this.b_Fim_Lista = true
    }
    if(this.b_Width){
      this.obj_Array_Conteudos = responseconteudo.data.conteudos
      this.objConteudo.nr_registos = responseconteudo.data.conteudos_aggregate.aggregate.count
    }
    else{
      this.obj_Array_Conteudos = [...this.obj_Array_Conteudos, ...responseconteudo.data.conteudos]
    }
  }

  Show_Item(conteudo) {
    conteudo.show = !conteudo.show
    if (conteudo.show) {
      this.obj_Array_Conteudos.forEach(fe => {
        if (conteudo.cd_conteudo != fe.cd_conteudo) {
          fe.show = false
        }
      })
    }
  }

  onFilter_Search(iten) {
    this.Input_Value = iten
  }
  Focus_Item(el: HTMLElement) {
    el.scrollIntoView();
  }

  Close_Modal() {
    this.b_Show_Filter = false
  }

  Filtrar() {
    this.b_Show_Filter = false
  }

  Show_Modal(event) {
    this.b_Show_Filter = event
  }

  /** @description Avança uma pagina */
  async Mudar_Pagina(nr_Pagina: number) {
    this.objConteudo.nr_pagina = nr_Pagina
    const responseusuarios = await this.conteudoService.Get_Conteudos(this.objConteudo)
    if (responseusuarios.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível trazer a listagem' })
    } else {
      this.obj_Array_Conteudos = responseusuarios.data.conteudos
      if (this.obj_Array_Conteudos == undefined) {
        this.obj_Array_Conteudos = []
      }
    }
  }
}
