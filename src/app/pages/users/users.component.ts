import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  /**@description caminho com o svg do topo */
  nm_Svg_Top: string = "assets/icons/filter.svg"

 /**@description caminho com o svg de baixo */
  nm_Svg_Bottom: string = "assets/icons/lixeira.svg"

  /**@description como o nome da opção que aparece por cima no popover */
  nm_Opcao_top: string = "Filtrar"

  /**@description como o nome da opção que aparece por baixo no popover */
  nm_Opcao_bottom: string = "Limpar filtros"

  /**@description define um comportamento diferente para o popover quando esta na tela de usuários */
  b_User_Page_Popover: boolean = true

 /**@description boolean para abrir ou fechar o popover */
  b_Show_Popover: boolean = false

  /**@description recebe a largura atual da tela */
  nr_Width: number

  /**@description boolean que fica true acima de 1034px */
  b_Width: boolean

  /**@description boolean que exibe os itens da listagem quando não é card */
  b_Show_Itens: boolean = false
  
  /**@description boolean para abrir e fechar o modal */
  b_Show_Modal: boolean = false

  /**@description recebe true quando o usuário clica no primeiro item do popover */
  onClick_Top: boolean

  /**@description contém o nome do label do input  */
  nm_Label_Input: string = "Nome"

  constructor() { }

  ngOnInit(): void {
    this.onResize()
  }

  objArrayTeste = [
    {
      nome: "Wesley",
      id: 1,
      usuario: "wesleyfa",
      perfil: "wesleyfa",
      status: "ativo",
      b_iten: true
    },
    {
      nome: "Bruno",
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
    if (this.nr_Width >= 1023) {
      this.b_Width = true
    } else{
      this.b_Width = false
    }
  }

  Show_Itens(){
    this.b_Show_Itens = !this.b_Show_Itens
  }

  onFilter_Popover(event){
    this.onClick_Top = event
    if(this.onClick_Top){
      this.b_Show_Modal = true
    }else{
      this.b_Show_Modal = false
    }
  }
}
