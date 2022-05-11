import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

b_Popover: boolean = false

  /** @description Input para exibir ou não o popover */
  @Input() b_Show_Popover: boolean 

  /** @description Input com o src do icon desejado na parte de cime */
  @Input() nm_Svg_Top: string = ""

  /** @description Input com o src do icon desejado na parte de baixo*/
  @Input() nm_Svg_Bottom: string

  /** @description Input que recebe o nome da opcao de cima*/
  @Input() nm_Opcao_top: string

  /** @description Input que recebe o nome da opcao de baixo*/
  @Input() nm_Opcao_bottom: string

  @Input() b_User_Page_Popover: boolean

  /** @description Output que emite true quando é clicado na opção do topo*/
  @Output() onClick_Option_Top = new EventEmitter<boolean>()

  constructor() { }

  ngOnInit(): void {
  }

  Click_Top_Option(){
    this.onClick_Option_Top.emit(true)
  }
}
