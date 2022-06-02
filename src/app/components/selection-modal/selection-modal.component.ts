import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ListModel } from 'src/app/models/arraylist/array-list';


@Component({
  selector: 'app-selection-modal',
  templateUrl: './selection-modal.component.html',
  styleUrls: ['./selection-modal.component.scss']
})

export class SelectionModalComponent implements OnInit {

  /** @description Array de Itens para listar */
  @Input() objArrayItens: Array<ListModel>

  /** @description recebe o label do input */
  @Input() nm_Label_Selection_Input: string
 
  /**@description emite true quando o modal é fechado */
  @Output() b_Closed_Modal = new EventEmitter<boolean>()

  /**@description emite o iten selecionado no modal */
  @Output() nm_Iten_Select = new EventEmitter()

  /** @description Valor da Pesquisa */
  value: string

  /** @description Instância de Filtro */
  @ViewChild("inputFiltro") input_Filtro: ElementRef

  constructor() { }

  ngOnInit(): void {
  }

  Modal_Closed() {
    this.b_Closed_Modal.emit(true)
  }

  Limpar() {
    this.value = '';
  }

  Select(iten) {
    this.value = iten
    this.nm_Iten_Select.emit(iten)
    this.b_Closed_Modal.emit(true)
  }
}
