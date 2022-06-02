import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { UsuarioParams } from 'src/app/models/usuario/usuario.model';
import { UsuarioRepository } from 'src/app/repositories/usuario.repository';
import { SubjectService } from 'src/app/services/subject.service';
import { UsuariosService } from '../usuarios.service';


@Component({
  selector: 'app-users',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.scss']
})

export class UsersComponent implements OnInit {

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

  obj_Array_Usuarios: any[]

  /** @description Evento para retornar se o botão de paginação foi apertado */
  @Output() onPageChange = new EventEmitter();

  /** @description Número de registros a serem exibidos por página */
  @Input() page_Length: number = 10

  /** @description Variavel para guardar a quantidade de registros */
  @Input() nr_Registros = 0

  /**@description Objeto que recebe o conteudo dos inputs */
  objFilter = new UsuarioParams

  constructor(
    private usuarioService: UsuariosService
  ) { }

  async ngOnInit() {
    this.onResize()
    const responseusuarios = await this.usuarioService.Get_Usuarios(this.objFilter)
    this.obj_Array_Usuarios = responseusuarios.data.usuarios
    this.nr_Registros = responseusuarios.data.usuarios_aggregate.aggregate.count
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

  Show_Item(item){
    item.show = !item.show
    if(item.show){
      this.obj_Array_Usuarios.forEach(fe => {
        if(item.cd_usuario != fe.cd_usuario){
          fe.show = false
        }
      })
    }
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
    this.nr_Pagina = nr_Pagina
  }
}
