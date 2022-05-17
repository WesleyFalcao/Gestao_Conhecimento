import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-adicionar-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  /**@description nome do label do primeiro input */
  nm_Label_Input_1: string = "Nome da categoria"

  /**@description nome do label do segundo input */
  nm_Label_Input_2: string = "Id"

  /**@description Boolean que recebe o evento de fechamento de modal */
  b_Closed_Modal: boolean

  /**@description Título da página */
  ds_Titulo_Filter: string = "Filtros"

  /**@description recebe a largura atual da tela */
  nr_Width: number

  /**@description caminho com o svg do topo */
  nm_Svg_Top: string = "assets/icons/filter.svg"

  /**@description caminho com o svg de baixo */
  nm_Svg_Bottom: string = "assets/icons/lixeira.svg"

  /**@description como o nome da opção que aparece por cima no popover */
  nm_Opcao_top: string = "Filtrar"

  /**@description como o nome da opção que aparece por baixo no popover */
  nm_Opcao_bottom: string = "Limpar filtros"

  /**@description define um comportamento diferente para o popover quando esta na tela de usuários */
  b_Rotate_Triangle: boolean = true

  /**@description boolean para abrir ou fechar o popover */
  b_Show_Popover: boolean = false

  /**@description boolean para abrir e fechar o modal */
  b_Show_Modal: boolean = false

  /**@description recebe true quando o usuário clica no primeiro item do popover */
  onClick_Top: boolean

  /**@description Nome do título */
  ds_Titulo: string = "Categorias"

  constructor() { }

  ngOnInit(): void {
    this.onResize()
  }

  objArrayTeste = [
    {
      nome: "CEDUSC",
      id: 1,
      usuario: "wesleyfa",
      perfil: "wesleyfa",
      status: "ativo",
      b_iten: true
    },
    {
      nome: "COMPLICE",
      id: 2,
      usuario: "brunop",
      perfil: "brunop",
      status: "ativo",
      b_iten: true
    },
  ]

  @HostListener('window:resize')
  onResize() {
    this.nr_Width = window.innerWidth
  }

  onFilter_Popover(event) {
    this.onClick_Top = event
    if (this.onClick_Top) {
      this.b_Show_Modal = true
    } else {
      this.b_Show_Modal = false
    }
  }

  Closed_Modal(event){
    this.b_Closed_Modal = event
    this.b_Show_Popover = false
    this.b_Show_Modal = false
  }
}
