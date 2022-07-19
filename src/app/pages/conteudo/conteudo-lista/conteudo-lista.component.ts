import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Component, ElementRef, HostListener, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, pairwise, throttleTime } from 'rxjs';
import { ConteudoModel } from 'src/app/models/conteudo/conteudo.model';
import { LoginService } from 'src/app/services/login.service';
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

  /**@description Boolean de refresh */
  b_Input_Open: boolean = false

  /** @description Recebe true quando no  final do virtual scroll*/
  b_Fim_Lista: boolean = false

  /**@description Recebe o valor digitado pelo usuário no desktop */
  Input_Value: any

  /**@description Contém os dados do usuário que seram gravados */
  objDados = { cd_Conteudo: null, cd_Usuario: null }

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  b_Exibir_Listagem: boolean

  /**@description Recebe o array de conteudos */
  obj_Array_Conteudos: Array<any> = []

  /**@description Boolean que recebe true caso usuário for admin */
  b_User_Admin: boolean = true

  /**@description Recebe o Id do usuário logado */
  cd_User_Logged: any

  /**@description Objeto de conteduos*/
  objConteudo = new ConteudoModel

  /**@description Recebe a resposata das queries de conteudos*/
  obj_Array_Response: any

  /**@description Instância do virtual scroll */
  @ViewChild(CdkVirtualScrollViewport) scroller: CdkVirtualScrollViewport

  constructor(
    private conteudoService: ConteudoService,
    private subjectService: SubjectService,
    private ngZone: NgZone,
    private loginService: LoginService,
    private route: ActivatedRoute,
  ) {
  }

  async ngOnInit() {
    const role = this.loginService.Name_Role()
    if (role == "trustee") {
      this.b_User_Admin = true
    } else {
      this.b_User_Admin = false
    }
    this.cd_User_Logged = this.loginService.Id_User_Logged()
    this.onResize()
    this.route.queryParams.subscribe(param => this.Input_Value = param.nm_searcch)
    if (this.Input_Value != null) {
      this.ds_Titulo = "Resultados"
      this.b_Input_Open = true
    } else {
      this.ds_Titulo = "Conteúdos"
    }
    this.Search_Conteudos()
  }

  ngAfterViewInit() {
    if (this.Input_Value != null) {
      this.Search_Conteudos()
    }
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

    if (this.Input_Value == null) {
      this.obj_Array_Response = await this.conteudoService.Get_Conteudos(this.objConteudo)
    } else {
      this.obj_Array_Response = await this.conteudoService.Get_Conteudos_Filter(this.objConteudo, this.Input_Value)
    }
    if (this.obj_Array_Response.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível trazer a listagem' })
    }
    if (this.obj_Array_Response.data.conteudos.length == 0) {
      this.b_Fim_Lista = true
    }
    if (this.b_Width) {
      this.obj_Array_Conteudos = this.obj_Array_Response.data.conteudos
      this.objConteudo.nr_registos = this.obj_Array_Response.data.conteudos_aggregate.aggregate.count
    }
    else {
      this.obj_Array_Conteudos = [...this.obj_Array_Conteudos, ...this.obj_Array_Response.data.conteudos]
    }
    if (this.obj_Array_Conteudos?.length == 0 && this.Input_Value != null) {
      this.b_Exibir_Listagem = false
    }
  }

  async onFilter_Search(iten) {
    this.Input_Value = null
    this.Input_Value = iten
    if (iten != null) {
      this.Search_Conteudos()
    }
  }

  async OnClick_Access(conteudo) {

    this.objDados.cd_Conteudo = conteudo.cd_conteudo
    this.objDados.cd_Usuario = this.cd_User_Logged
    const responseacesso = await this.conteudoService.Set_Gravar_Dados(this.objDados)
    if (responseacesso.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível acessar' })
    } else {
      window.open(conteudo.ds_link, "_blank")
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

  onClick_Refresh() {
    this.objConteudo.nr_pagina = 1
    this.obj_Array_Conteudos = []
    this.b_Fim_Lista = !this.b_Fim_Lista
    if (this.b_Width == false) {
      document.getElementById('virtualscroll')?.scrollTo({ top: 0 })
    }
    this.Input_Value = null
    this.Search_Conteudos()
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
    if (this.Input_Value == null) {
      const responseusuarios = await this.conteudoService.Get_Conteudos(this.objConteudo)

      if (responseusuarios.errors) {
        this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível trazer a listagem' })
      } else {
        this.obj_Array_Conteudos = responseusuarios.data.conteudos
        if (this.obj_Array_Conteudos == undefined) {
          this.obj_Array_Conteudos = []
        }
      }
    } else {
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
}
