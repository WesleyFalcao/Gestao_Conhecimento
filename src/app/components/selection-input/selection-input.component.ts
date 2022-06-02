import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ListModel } from 'src/app/models/arraylist/array-list';

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
  @Input() objArrayList: Array<ListModel>

  /** @description Recebe o valor que é selecionado pelo usuário no madal */
  @Input() Iten_Select: any

  /** @description Emite o valor selecionado pelo usuário no madal */
  @Output() Value_Select = new EventEmitter()

  /** @description FormControl auxiliar */
  control_Aux = new FormControl()

  /** @description Boolean para abrir o modal */
  b_Show_Modal: boolean = false

  /** @description Recebe o evento de fechar modal */
  b_Closed_Modal: boolean

  constructor(
  ) { }

  ngOnInit(): void {}

  Remover_Valor(event) {
    event.preventDefault()
    event.stopPropagation()
    // this.control.setValue(null)
    // this.control_Aux.setValue(null)
    this.Iten_Select = null
  }

  Closed_Modal(event: any){
    this.b_Closed_Modal = event
    this.b_Show_Modal = false
  }

  Iten_Select_Modal(event: any){
    this.Iten_Select = event
    console.log("this.Iten_Select",this.Iten_Select)
    this.Value_Select.emit(event)
  }
}
