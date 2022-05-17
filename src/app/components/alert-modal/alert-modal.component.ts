import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  /**@description boolean para abrir e fechar o modal */
  @Input() b_Show_Alert_Modal: boolean

  /**@description emite true quando o modal é fechado */
  @Output() b_Closed_Alert_Modal = new EventEmitter()
  
  /**@description Contém da descrição do modal de alerta*/
  @Input() ds_Descricao: string = ""

  constructor() { }

  ngOnInit(): void {
  }

  Modal_Closed(){
    this.b_Closed_Alert_Modal.emit()
  }
}
