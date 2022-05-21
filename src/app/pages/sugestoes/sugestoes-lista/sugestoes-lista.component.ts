import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-sugestoes-lista',
  templateUrl: './sugestoes-lista.component.html',
  styleUrls: ['./sugestoes-lista.component.scss']
})
export class SugestoesListaComponent implements OnInit {

  /**@description boolean para abrir e fechar o modal */
  b_Show_Modal: boolean = false

  /**@description boolean que exibe os itens da listagem quando não é card */
  b_Show_Itens: boolean = false

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

  /**@description Recebe o valor digitado pelo usuário no desktop */
  Input_Value: string

  /** @description Boolean para exibir ou fechar o modal de confirmação */
  b_Confirmation_Show_Modal: boolean

  /**@description Contém da descrição do modal de alerta*/
  ds_Descricao: string = "Tem certeza que deseja desarquivar?"

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  /**@description Objeto que recebe o conteudo dos inputs */
  objFilter = { nm_Nome: "", nm_Usuario: "", nm_Status: "" }

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

  Closed_Alert_Modal() {
    this.b_Confirmation_Show_Modal = false
  }

  onClick_Option_Bottom(event) {
    this.b_Confirmation_Show_Modal = event
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
}
