import { Component, ElementRef, EventEmitter, HostListener, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { ListModel } from 'src/app/models/arraylist/array-list';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { UsuarioParams } from 'src/app/models/usuario/usuario.model';
import { UsuarioFilter } from 'src/app/models/usuario/usuariofilter.model';
import { UsuarioRepository } from 'src/app/repositories/usuario.repository';
import { LoginService } from 'src/app/services/login.service';
import { SubjectService } from 'src/app/services/subject.service';
import { UsuariosService } from '../usuarios.service';
import { filter, map, pairwise, throttleTime } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.scss']
})

export class UsersComponent implements OnInit {

  /**@description recebe o array de status */
  objArrayStatus: Array<ListModel> = [
    {
      nome: "Ativo"
    },
    {
      nome: "Inativo"
    }
  ]

  /**@description recebe a largura atual da tela */
  nr_Width: number

  /**@description boolean que fica true acima de 1034px */
  b_Width: boolean

  /**@description Nome do label do selection input */
  nm_Label_Selection: string = "Status"

  /**@description Título da página */
  ds_Titulo: string = "Usuários"

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  /**@description Recebe o valor digitado pelo usuário no desktop */
  Input_Value: string

  /** @description Index da Página */
  nr_Pagina = 1

  /** @description Recebe true quando no  final do virtual scroll*/
  b_Fim_Lista: boolean = false

  /** @description Recebe o array de usuário */
  obj_Array_Usuarios: any[]

  /**@description Objeto que recebe os valores de cada coluna */
  objUsuarios = new UsuarioParams

  @ViewChild(CdkVirtualScrollViewport) scroller: CdkVirtualScrollViewport

  constructor(
    private usuarioService: UsuariosService,
    private loginService: LoginService,
    private subjectService: SubjectService,
    private ngZone: NgZone
  ) { }

  async ngOnInit() {
    this.onResize()
  }

  ngAfterViewInit() {
    if(this.b_Width){
      this.Search_User()
    }
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(200)
    ).subscribe(() => {
      this.ngZone.run(async () => {
        if (this.b_Fim_Lista != true) {
          this.objUsuarios.nr_pagina++
          this.Search_User();
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
    }
  }

  onFilter_Search(iten) {
    this.Input_Value = iten
  }

  Value_Select_Status(iten) {
    if (iten.nome == "Ativo") {
      this.objUsuarios.dt_bloqueio = null
    }
  }

  Show_Item(item) {
    item.show = !item.show
    if (item.show) {
      this.obj_Array_Usuarios.forEach(fe => {
        if (item.cd_usuario != fe.cd_usuario) {
          fe.show = false
        }
      })
    }
  }

  Filtrar() {
    this.b_Show_Filter = false
  }

  Close_Modal() {
    this.b_Show_Filter = false
  }

  Show_Modal(event) {
    this.b_Show_Filter = event
  }

  async Search_User() {
    const responseusuarios = await this.usuarioService.Get_Usuarios(this.objUsuarios)
    if (responseusuarios.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível trazer a listagem' })
    }
    if (this.obj_Array_Usuarios?.length == 0) {
      this.b_Fim_Lista = true
    }
    if (this.b_Width) {
      this.obj_Array_Usuarios = responseusuarios.data.usuarios
      this.objUsuarios.nr_registos = responseusuarios.data.usuarios_aggregate.aggregate.count
      console.log("paginacao",this.obj_Array_Usuarios)

    } else {
      this.obj_Array_Usuarios = responseusuarios.data.usuarios
      this.obj_Array_Usuarios = [...this.obj_Array_Usuarios, ...responseusuarios.data.usuarios]
      console.log("virtual",this.obj_Array_Usuarios)
    }
  }

  /** @description Avança uma pagina */
  async Mudar_Pagina(nr_Pagina: number) {
    this.objUsuarios.nr_pagina = nr_Pagina
    const responseusuarios = await this.usuarioService.Get_Usuarios(this.objUsuarios)
    if (responseusuarios.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível trazer a listagem' })
    } else {
      this.obj_Array_Usuarios = responseusuarios.data.usuarios
    }
  }
}
