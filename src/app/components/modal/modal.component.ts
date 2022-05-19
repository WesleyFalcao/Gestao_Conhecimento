import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() b_Show = false

  @Input() ds_Title = "Title"

  @Output() b_Click_Sobreposicao = new EventEmitter()

  Click_Sobreposicao(){
    this.b_Click_Sobreposicao.emit()
  }
}
