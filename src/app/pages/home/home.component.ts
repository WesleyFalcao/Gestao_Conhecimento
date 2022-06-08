import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, HostListener, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map, pairwise, Subject, takeUntil, throttleTime } from 'rxjs';
import { ConteudoModel } from 'src/app/models/conteudo/conteudo.model';
import { HomeRepository } from 'src/app/repositories/home.repository';
import { LoginService } from 'src/app/services/login.service';
import { SubjectService } from 'src/app/services/subject.service';
import { CategoriaService } from '../categorias/categoria.service';
import { ConteudoService } from '../conteudo/conteudo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /** @description Recebe o array de categorias */
  obj_Array_Categoria

  /**@description Título da página */
  ds_Titulo: string = "Resultados"

  /**@description Recebe o array de conteudos */
  obj_Array_Conteudos: Array<any> = []

  /** @description String que armazena o caminho do SVG */
  nm_Src_Icon: string = "assets/icons/search-glass-black.svg"

  /** @description Boolean para exibit ou não a barra de input */
  b_Show_Input: boolean

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  /**@description Recebe o valor digitado pelo usuário no desktop */
  Input_Value: any

  /** @description Recebe a largura atual da tela */
  nr_Width: number

  /**@description boolean que fica true acima de 1034px */
  b_Width: boolean

  /** @description Recebe true quando no  final do virtual scroll*/
  b_Fim_Lista: boolean = false

  /**@description Contém os dados do usuário que seram gravados */
  objDados = { cd_Conteudo: null, nm_Usuario: "" }

  /**@description Recebe o nome do usário que adicionou a sugestão */
  nm_User: string

  /**@description Objeto de conteduos*/
  objConteudo = new ConteudoModel

  /** @description Subject para destruir os subscribers */
  subject_unsub = new Subject()

  /**@description Instância do virtual scroll */
  @ViewChild(CdkVirtualScrollViewport) scroller: CdkVirtualScrollViewport

  /** @description Boolena usado para retirar o botão de voltar na página home */
  b_Nao_Exibir_Voltar: boolean = true

  constructor(
    private subjectService: SubjectService,
    private categoriaService: CategoriaService,
    private router: Router,
    private subject_service: SubjectService,
    private loginService: LoginService,
    private conteudoService: ConteudoService,
    private ngZone: NgZone,
  ) { }

  async ngOnInit() {
    this.onResize()
    this.nm_User = this.loginService.Name_User_Logged()
    const responsecategoria = await this.categoriaService.Get_Categories_List()
    this.obj_Array_Categoria = responsecategoria.data.categorias
  }

  ngAfterViewInit() {
   
    if(!this.b_Width){
      this.scroller.elementScrolled().pipe(
        map(() => this.scroller.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => (y2 < y1 && y2 < 500)),
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
  }

  @HostListener('window:resize')
  onResize() {
    this.nr_Width = window.innerWidth
    this.subjectService.subject_Width.next(this.nr_Width)
    if (this.nr_Width >= 768) {
      this.b_Show_Input = true
      this.b_Width = true
    } else {
      this.b_Show_Input = false
      this.b_Width = false
      // this.objConteudo.page_lenght = 10
    }
  }

  Show_Modal(event) {
    this.b_Show_Filter = event
  }

  Close_Modal() {
    this.b_Show_Filter = false
  }

  Focus_Item(el: HTMLElement) {
    el.scrollIntoView();
  }

  Show_Item(conteudo) {
    conteudo.show = !conteudo.show

    console.log(conteudo.show)
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
    if (this.Input_Value == "") {
      this.Input_Value = null
      this.obj_Array_Conteudos = []
    }
    setTimeout(() => {
      this.Search_Conteudos()
    }, 100);
  }

  Filtrar() {
    this.b_Show_Filter = false
  }

  async Search_Conteudos() {
    const responseconteudo = await this.conteudoService.Get_Conteudos_Filter(this.objConteudo, this.Input_Value)

    if (responseconteudo.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível trazer a listagem' })
    }
   
    if (responseconteudo.data.conteudos.length == 0) {
      this.b_Fim_Lista = true
    }
    this.objConteudo.nr_registos = responseconteudo.data.conteudos_aggregate.aggregate.count
   
    if (this.b_Width) {
      this.obj_Array_Conteudos = responseconteudo.data.conteudos
    }
    else {
      this.obj_Array_Conteudos = [...this.obj_Array_Conteudos, ...responseconteudo.data.conteudos]
    }
  }

  async OnClick_Access(conteudo) {

    this.objDados.cd_Conteudo = conteudo.cd_conteudo
    console.log("estudo", conteudo)
    this.objDados.nm_Usuario = this.nm_User
    const responseacesso = await this.conteudoService.Set_Gravar_Dados(this.objDados)
    console.log(responseacesso)
    if (responseacesso.errors) {
      this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Não foi possível acessar' })
    } else {
      window.open(conteudo.ds_link, "_blank")
    }
  }

  async Mudar_Pagina(nr_Pagina: number) {
    this.objConteudo.nr_pagina = nr_Pagina
    const responseusuarios = await this.conteudoService.Get_Conteudos_Filter(this.objConteudo, this.Input_Value)
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
