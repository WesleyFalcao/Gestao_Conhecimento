import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {

  b_Popover: boolean

  /** @description Input para exibir ou não o popover */
  @Input() b_Show_Popover: boolean 

  /** @description Input com o src do icon desejado na parte de cime */
  @Input() nm_Svg_Top: string = ""

  /** @description Input com o src do icon desejado na parte de baixo */
  @Input() nm_Svg_Bottom: string

  /** @description Input que recebe o nome da opcao de cima */
  @Input() nm_Opcao_top: string

  /** @description Input que recebe o nome da opcao de baixo */
  @Input() nm_Opcao_bottom: string

  /** @description Aplica css específico se for na pagina de usuarios */
  @Input() b_Rotate_Triangle: boolean

  /** @description Output que emite true quando é clicado na opção do topo*/
  @Output() onClick_Option_Top = new EventEmitter<boolean>()
  
  /** @description Output que emite true quando é clicado na opção do topo*/
  @Output() onClick_Option_Bottom = new EventEmitter<boolean>()

  constructor(
    private eRef: ElementRef
  ) { }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
    
    } else {
      this.b_Popover = false;
    }
  }
  
  Click_Top_Option(){
    this.onClick_Option_Top.emit(true)
  }

  Click_Bottom_Option(){
    this.onClick_Option_Bottom.emit(true)
  }
}
