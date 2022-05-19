import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class FilterModalComponent implements OnInit {

  objFilter = { nm_Nome: "", nm_Usuario: "", nm_Status:"" }

  @Output() obj_Filter_Emit = new EventEmitter()
  
  /**@description nome do label do primeiro input */
  @Input() nm_Label_Input_1: string = ""

  /**@description nome do label do segundo input */
  @Input() nm_Label_Input_2: string = ""

  /**@description nome do label do terceiro input */
  @Input() nm_Label_Input_3

  /**@description Valor que vai para o primeiro campo de input */
  @Input() nm_Field_1: string

  /**@description boolean para abrir ou fechar o popover */
  b_Show_Popover: boolean = false

  /**@description boolean para abrir e fechar o modal */
  @Input() b_Show_Modal: boolean = false

  /**@description emite true quando o modal é fechado */
  @Output() b_Closed_Modal = new EventEmitter<boolean>()
  
  /**@description Título do modal */
  @Input() ds_Titulo: string = ""

  /**@description Recebe o valor digitado pelo usuário no desktop */
  Input_Value: string

  Input_Value2: string

  Input_Value3: string

  constructor() { }

  ngOnInit(): void {
  }

  Modal_Closed(){
    this.b_Closed_Modal.emit(true)
  }

  onFilter_Search(iten){
    this.Input_Value = iten
    // console.log("Campo filtro 1", this.Input_Value)
  }
  onFilter_Search2(iten){
    this.Input_Value2 = iten
    // console.log("Campo filtro 2", this.Input_Value2)
  } 
  onFilter_Search3(iten){
    this.Input_Value3 = iten
    // console.log("Campo filtro 3", this.Input_Value3)
  } 

  Filtrar(){
    this.obj_Filter_Emit.emit(this.objFilter)
    console.log(this.objFilter)
  }
}
