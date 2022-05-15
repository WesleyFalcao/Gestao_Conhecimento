import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SubjectService } from 'src/app/services/subject.service';


@Component({
  selector: 'app-selection-modal',
  templateUrl: './selection-modal.component.html',
  styleUrls: ['./selection-modal.component.scss']
})
export class SelectionModalComponent implements OnInit {

  /** @description Array de Itens para listar */
  @Input() objArrayItens
    
  /** @description Campo que será usado como Descrição */
  nm_Descricao = "nm_Nome"

  /**@description emite true quando o modal é fechado */
  @Output() b_Closed_Modal = new EventEmitter<boolean>()

  /**@description emite o iten selecionado no modal */
  @Output() nm_Iten_Select = new EventEmitter()

  /** @description Valor da Pesquisa */
  value: string

  @Input() show: boolean = false

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

    this.objArrayItens.forEach(element => {
      element._checkbox = false
    });
  }

  Select(iten) {
    this.value = iten
    this.nm_Iten_Select.emit(iten)
    this.show = false
    this.b_Closed_Modal.emit(true)
  }
}
