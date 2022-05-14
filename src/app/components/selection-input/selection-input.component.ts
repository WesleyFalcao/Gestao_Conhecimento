import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'selection-input',
  templateUrl: './selection-input.component.html',
  styleUrls: ['./selection-input.component.scss']
})
export class SelectionInputComponent implements OnInit {

  /** @description Label do Input */
  @Input() label: string

  /** @description FormControl do Campo */
  @Input() control = new FormControl()

  /** @description FormControl auxiliar */
  control_Aux = new FormControl()

  /** @description Boolean para abrir o modal */
  b_Show_Modal: boolean = false

  /** @description Recebe o evento de fechar modal */
  b_Closed_Modal: boolean

  /** @description Contém o valor selecionado pelo usuário no madal */
  value: any

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
    this.value = event
    console.log(event)
  }
}
