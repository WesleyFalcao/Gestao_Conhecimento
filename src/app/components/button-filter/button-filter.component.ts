import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-filter',
  templateUrl: './button-filter.component.html',
  styleUrls: ['./button-filter.component.scss']
})
export class ButtonFilterComponent implements OnInit {

  /**@description Recebe o valor digitado pelo usuário no desktop */
  @Input() Input_Value: string

  /**@description boolean para abrir e fechar o modal */
  @Output() b_Show_Modal = new EventEmitter()

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

  onFilter_Popover() {
    this.b_Show_Modal.emit(true)
  }
}