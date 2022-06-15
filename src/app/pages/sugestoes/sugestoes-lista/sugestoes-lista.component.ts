import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, HostListener, NgZone, OnInit, ViewChild } from '@angular/core';
import { filter, map, pairwise, throttleTime } from 'rxjs';
import { SugestaoModel } from 'src/app/models/sugestao/sugestao.model';
import { SubjectService } from 'src/app/services/subject.service';
import { SugestoesService } from '../sugestoes.service';

@Component({
  selector: 'app-sugestoes-lista',
  templateUrl: './sugestoes-lista.component.html',
  styleUrls: ['./sugestoes-lista.component.scss']
})
export class SugestoesListaComponent implements OnInit {

  /**@description boolean para abrir e fechar o modal */
  b_Show_Modal: boolean = false

  /**@description Título da página */
  ds_Titulo_Filter: string = "Filtros"

  /**@description Boolean que recebe o evento de fechamento de modal */
  b_Closed_Modal: boolean

  /**@description Título da página */
  ds_Titulo: string = "Sugestões arquivadas"

  /**@description recebe a largura atual da tela */
  nr_Width: number

  /**@description boolean que fica true acima de 1034px */
  b_Width: boolean

  /**@description Recebe o valor digitado pelo usuário*/
  Input_Value: any

  /** @description Recebe true quando no  final do virtual scroll*/
  b_Fim_Lista: boolean = false

  /** @description Boolean para exibir ou fechar o modal de confirmação */
  b_Confirmation_Show_Modal: boolean

  /**@description Contém da descrição do modal de alerta*/
  ds_Descricao: string = "Tem certeza que deseja desarquivar?"

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  /**@description Recebe o id da sugestão clicada */
  cd_Sugestao: number

  /**@description Recebe o index da sugestão clicada */
  cd_Index: number

  /**@description Objeto de sugestao */
  objSugestao = new SugestaoModel

  /**@description Recebe o array de sugestões arquivadas */
  obj_Array_Sugestoes_Arquivadas: Array<any> = []

  /**@description Instância do virtual scroll */
  @ViewChild(CdkVirtualScrollViewport) scroller: CdkVirtualScrollViewport

  constructor(
    private sugestoesService: SugestoesService,
    private subjectService: SubjectService,
    private ngZone: NgZone
  ) { }

  async ngOnInit() {
    this.onResize()
    this.Search_Sugestoes()
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

          this.objSugestao.nr_pagina++
          this.Search_Sugestoes();
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
      this.objSugestao.page_lenght = 30
    }
  }

  Show_Itens(item) {
    item.show = !item.show
    if (item.show) {
      this.obj_Array_Sugestoes_Arquivadas.forEach(fe => {
        if (item.cd_sugestao != fe.cd_sugestao) {
          fe.show = false
        }
      })
    }
  }

  onClick_Unarchive(iten, index) {
    this.b_Confirmation_Show_Modal = true
    this.cd_Sugestao = iten
    this.cd_Index = index
  }

  async onClick_Refresh() {
    this.objSugestao.nr_pagina = 1
    this.obj_Array_Sugestoes_Arquivadas = []
    this.Input_Value = null
    this.b_Fim_Lista = !this.b_Fim_Lista
    if (this.b_Width == false) {
      document.getElementById('virtualscroll')?.scrollTo({ top: 0 })
    }
    this.Search_Sugestoes()
  }

  async Unarchive() {
    this.b_Confirmation_Show_Modal = false
    const responseunarchive = await this.sugestoesService.Set_Unarchive_Suggestion(this.cd_Sugestao)
    if (responseunarchive.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível desarquivar' })
    } else {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Desarquivado com sucesso!' })
      this.obj_Array_Sugestoes_Arquivadas.splice(this.cd_Index, 1)  
    }
  }

  Closed_Alert_Modal() {
    this.b_Confirmation_Show_Modal = false
  }

  onClick_Option_Bottom(event) {
    this.b_Confirmation_Show_Modal = event
  }

  onFilter_Search(iten) {
    this.Input_Value = iten
  }

  async Search_Sugestoes() {
    const responselist = await this.sugestoesService.Get_Files_Suggestion(this.objSugestao)
    if(responselist.erros){
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível trazer a listagem' })
    }
    if (responselist.data.sugestoes.length == 0) {
      this.b_Fim_Lista = true
    }
    if(this.b_Width){
      this.obj_Array_Sugestoes_Arquivadas = responselist.data.sugestoes
      this.objSugestao.nr_registos = responselist.data.sugestoes_aggregate.aggregate.count

    }else{
      this.obj_Array_Sugestoes_Arquivadas = [...this.obj_Array_Sugestoes_Arquivadas, ...responselist.data.sugestoes]
    }
  }

  Filtrar() {

    this.b_Show_Filter = false
  }

  Focus_Item(el: HTMLElement) {
    el.scrollIntoView();
  }


  Close_Modal() {
    this.b_Show_Filter = false
  }

  Show_Modal(event) {
    this.b_Show_Filter = event
  }

  /** @description Avança uma pagina */
  async Mudar_Pagina(nr_Pagina: number) {
    this.objSugestao.nr_pagina = nr_Pagina
    const responseusuarios = await this.sugestoesService.Get_Files_Suggestion(this.objSugestao)
    if (responseusuarios.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível trazer a listagem' })
    } else {
      this.obj_Array_Sugestoes_Arquivadas = responseusuarios.data.sugestoes
      if (this.obj_Array_Sugestoes_Arquivadas == undefined) {
        this.obj_Array_Sugestoes_Arquivadas = []
      }
    }
  }
}
