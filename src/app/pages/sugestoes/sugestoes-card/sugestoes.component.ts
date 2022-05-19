import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-sugestoes',
  templateUrl: './sugestoes.component.html',
  styleUrls: ['./sugestoes.component.scss']
})
export class SugestoesComponent implements OnInit {

  /**@description caminho com o svg de baixo no filtro*/
  nm_Filter_Svg_Bottom: string = "assets/icons/lixeira.svg"

  /**@description Boolean para exibir popover no filtro */
  b_Filter_Show_Popover: boolean = false

  /**@description caminho com o svg de cima no filtro */
  nm_Filter_Svg_Top: string = "assets/icons/filter.svg"

  /**@description como o nome da opção que aparece por cima no popover do filtro */
  nm_Filter_Opcao_top: string = "Filtrar"

  /** @description Boolean para exibir ou fechar o modal de filtro */
  b_Filter_Show_Modal: boolean

  /**@description Gira o triângulo do popover no filtro */
  b_Filter_Rotate_Triangle: boolean = true

  /**@description como o nome da opção que aparece por baixo no popover do Filtro*/
  nm_Filter_Opcao_bottom: string = "Limpar filtros"

  /**@description nome do label do primeiro input */
  nm_Label_Input_Filter_1: string = "Título"

  /**@description nome do label do segundo input */
  nm_Label_Input_Filter_2: string = "Subtitulo"

  /**@description Título da página */
  ds_Filter_Titulo: string = "Filtros"

  /**@description Recebe true quando o usuário clica no primeiro item do popover */
  onClick_Filter_Top: boolean

  /**@description como o nome da opção que aparece por cima no popover */
  nm_Opcao_top: string = "Minhas sugestões: 2"

  /**@description como o nome da opção que aparece por baixo no popover */
  nm_Opcao_bottom: string = "Total: 2"

  /**@description define um comportamento diferente para o popover quando esta na tela de usuários */
  b_Rotate_Triangle: boolean = true

  /**@description boolean para abrir ou fechar o popover */
  b_Show_Popover_Feitos: boolean = false

  /**@description Bolean para exibir svg de okay no check-box */
  b_Okay: boolean = false

  /**@description Number que vai receber o número de sugestões cadastradas pelo usuário */
  nr_Minhas_Sugestoes: number = 6

  /**@description Number que vai receber o total de sugestões */
  nr_Total_Sugestoes: number = 20

  ds_Titulo: string = "Sugestões"

  constructor(
    private eRef: ElementRef
  ) { }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      
    } else {
      this.b_Show_Popover_Feitos = false
      this.b_Filter_Show_Popover = false
    }
  }

  onFilter_Popover(event) {
    this.onClick_Filter_Top = event
    if (this.onClick_Filter_Top) {
      this.b_Filter_Show_Modal = true
    } else {
      this.b_Filter_Show_Modal = false
    }
  }

  Closed_Modal_Filter() {
    this.b_Filter_Show_Popover = false
    this.b_Filter_Show_Modal = false
  }

}
