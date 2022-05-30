import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'selection-input',
  templateUrl: './selection-input.component.html',
  styleUrls: ['./selection-input.component.scss']
})
export class SelectionInputComponent implements OnInit {

  /** @description Label do Input */
  @Input() nm_Label_Selection_Input: string

  /** @description FormControl do Campo */
  @Input() control = new FormControl()

  /** @description Array que recebe a listagem */
  @Input() objArrayList

  /** @description FormControl auxiliar */
  control_Aux = new FormControl()

  /** @description Boolean para abrir o modal */
  b_Show_Modal: boolean = false

  /** @description Recebe o evento de fechar modal */
  b_Closed_Modal: boolean

  /** @description Emite o valor selecionado pelo usuário no madal */
  @Output() nm_Value_Select = new EventEmitter()

  /** @description Recebe o valor que é selecionado pelo usuário no madal */
  Iten_Select: any

  constructor(
  ) { }

  ngOnInit(): void {
    
  }

  Remover_Valor(event) {
    event.preventDefault()
    event.stopPropagation()
    this.control.setValue(null)
    this.control_Aux.setValue(null)
  }

  Closed_Modal(event){
    this.b_Closed_Modal = event
    this.b_Show_Modal = false
  }

  Iten_Select_Modal(event){
    this.Iten_Select = event
    this.nm_Value_Select.emit(event)
  }
}
