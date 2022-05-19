import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})

export class InputComponent implements OnInit {

  /**@description Recebe o nome do label */
  @Input() nm_Label_Input: string = ""

  /**@description Recebe o valor digitado no input do header */
  @Input() nm_Field_Input: string

  /** @description Emite o conteúdo digitado na barra de pesquisa */
  @Output() Input_Emit_Value = new EventEmitter()

  /** @description Usado para o debounce */
  modelChanged = new FormControl()

  /** @description Recebe o conteúdo digitado na barra de pesquisa  */
  Input_Value: string

  constructor() { }

  ngOnInit(): void {
    this.modelChanged.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(async(input) => {
      this.Input_Value = input
      this.Input_Emit_Value.emit(this.Input_Value)
      console.log("Input", this.Input_Value)
    })
  }
}
