import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-sugestoes-lista',
  templateUrl: './sugestoes-lista.component.html',
  styleUrls: ['./sugestoes-lista.component.scss']
})
export class SugestoesListaComponent implements OnInit {

  /**@description nome do label do primeiro input */
  nm_Label_Input_1: string = "Título"

  /**@description nome do label do segundo input */
  nm_Label_Input_2: string = "Descrição"

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

  /**@description boolean que exibe os itens da listagem quando não é card */
  b_Show_Itens: boolean = false

  /**@description contém o nome do label do input  */
  nm_Label_Input: string = "Nome"

  /**@description recebe a largura atual da tela */
  nr_Width: number

  /**@description boolean que fica true acima de 1034px */
  b_Width: boolean

  /**@description Título da página */
  ds_Titulo: string = "Sugestões Arquivadas"

  /**@description Título da página */
  ds_Titulo_Filter: string = "Filtros"

  /**@description Boolean que recebe o evento de fechamento de modal */
  b_Closed_Modal: boolean

  /**@description Contém da descrição do modal de alerta*/
  ds_Descricao: string = "Tem certeza que deseja desarquivar?"

  /** @description Boolean para exibir ou fechar o modal de confirmação */
  b_Confirmation_Show_Modal: boolean

  constructor(
   
    ) { }

  ngOnInit(): void {
    this.onResize()
  }

  objArrayTeste = [
    {
      nome: "O mundo é lindo",
      descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolorum nostrum aperiam ea repellat error rem vel iure et eos maiores adipisci officiis autem repellendus esse, corporis",
      usuario: "wesleyfa",
      perfil: "wesleyfa",
      status: "ativo",
      b_iten: true
    },
    {
      nome: "O mundo é lindo",
      descricao: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolorum nostrum aperiam ea repellat error rem vel iure et eos maiores adipisci officiis autem repellendus esse, corporis",
      usuario: "wesleyfa",
      perfil: "wesleyfa",
      status: "ativo",
      b_iten: true
    },
  
  ]

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

  onFilter_Popover(event) {
    this.onClick_Top = event
    if (this.onClick_Top) {
      this.b_Show_Modal = true
    } else {
      this.b_Show_Modal = false
    }
  }

  Closed_Modal(event) {
    this.b_Closed_Modal = event
    this.b_Show_Popover = false
    this.b_Show_Modal = false
  }

  Closed_Alert_Modal() {
    this.b_Confirmation_Show_Modal = false
    this.b_Show_Popover = false
  }

  onClick_Option_Bottom(event) {
    this.b_Confirmation_Show_Modal = event
  }

}
