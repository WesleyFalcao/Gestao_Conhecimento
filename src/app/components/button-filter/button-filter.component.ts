import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button-filter',
  templateUrl: './button-filter.component.html',
  styleUrls: ['./button-filter.component.scss']
})
export class ButtonFilterComponent implements OnInit {

  /**@description caminho com o svg do topo */
  nm_Svg_Top: string = "assets/icons/filter.svg"

  /**@description caminho com o svg de baixo */
  nm_Svg_Bottom: string = "assets/icons/lixeira.svg"

  /**@description como o nome da opção que aparece por cima no popover */
  nm_Opcao_top: string = "Filtrar"

  /**@description como o nome da opção que aparece por baixo no popover */
  nm_Opcao_bottom: string = "Limpar filtros"

  /**@description recebe true quando o usuário clica no primeiro item do popover */
  onClick_Top: boolean

  /**@description define um comportamento diferente para o popover quando esta na tela de usuários */
  b_Rotate_Triangle: boolean = true

  /**@description boolean para abrir ou fechar o popover */
  b_Show_Popover: boolean = false



  /**@description Recebe o valor digitado pelo usuário no desktop */
  @Input() Input_Value: string



  /**@description boolean para abrir e fechar o modal */
  b_Show_Modal: boolean = false

  /**@description Título da página */
  ds_Titulo_Filter: string = "Filtros"

  /**@description nome do label do primeiro input */
  nm_Label_Input_1: string = "Nome do usuário"

  /**@description nome do label do segundo input */
  nm_Label_Input_2: string = "Usuário do computador"

  /**@description nome do label do terceiro input */
  nm_Label_Input_3: string = "Status (ativo ou inativo)"

  constructor(private eRef: ElementRef) { }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      
    } else {
      this.b_Show_Popover = false
    }
  }

  onFilter_Popover(event) {
    this.b_Show_Modal = event
  }

  Closed_Modal(){
    this.b_Show_Popover = false
    this.b_Show_Modal = false
  }
}