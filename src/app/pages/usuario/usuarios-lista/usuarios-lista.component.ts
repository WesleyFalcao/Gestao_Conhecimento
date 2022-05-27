import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { UsuarioRepository } from 'src/app/repositories/usuario.repository';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-users',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.scss']
})

export class UsersComponent implements OnInit {

  /**@description boolean que exibe os itens da listagem quando não é card */
  b_Show_Itens: boolean = false

  /**@description recebe a largura atual da tela */
  nr_Width: number

  /**@description boolean que fica true acima de 1034px */
  b_Width: boolean

  /**@description Título da página */
  ds_Titulo: string = "Usuários"

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  /**@description Recebe o valor digitado pelo usuário no desktop */
  Input_Value: string

  /** @description Variavel auxiliar para controlar a pagina */
  aux_Pagina = 1

  /** @description Index da Página */
  nr_Pagina = 1

  obj_Array_Usuarios: []

  /** @description Evento para retornar se o botão de paginação foi apertado */
  @Output() onPageChange = new EventEmitter();

  /** @description Número de registros a serem exibidos por página */
  @Input() page_Length: number = 10

  /** @description Variavel para guardar a quantidade de registros */
  @Input() nr_Registros = 0

  /**@description Objeto que recebe o conteudo dos inputs */
  objFilter = { cd_usuario: undefined, nm_usuario: "", cd_login: "", dt_bloqueio: "", nr_pagina: this.nr_Pagina, nr_page_length: this.page_Length, nr_registos: this.nr_Registros }

  constructor(
    private subjectService: SubjectService,
    private usuarioRepository: UsuarioRepository
  ) { }

  async ngOnInit() {
    this.onResize()

    const responseusuario = await this.usuarioRepository.Get_Usuarios(this.objFilter)
    this.obj_Array_Usuarios = responseusuario.data.usuarios_aggregate.nodes
    this.nr_Registros = responseusuario.data.usuarios_aggregate.aggregate.count
    console.log("registros", this.nr_Registros)
    console.log("arrayusuarios", this.obj_Array_Usuarios)
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

  Show_Itens() {
    this.b_Show_Itens = !this.b_Show_Itens
  }

  onFilter_Search(iten) {
    this.Input_Value = iten
  }

  Filtrar() {
    console.log(this.objFilter)
    this.b_Show_Filter = false

  }

  Close_Modal() {
    this.b_Show_Filter = false
  }

  Show_Modal(event) {
    this.b_Show_Filter = event
  }

  /** @description Avança uma pagina */
  Mudar_Pagina(nr_Pagina: number) {
    this.onPageChange.emit(this.aux_Pagina = nr_Pagina)
  }
}
