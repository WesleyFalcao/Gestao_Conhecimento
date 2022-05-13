import { Location } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  /**@description boolean para abrir ou fechar o popover */
  b_Show_Popover: boolean = false

  /** @description String que armazena o caminho do SVG */
  nm_Src_Icon: string = "assets/icons/search-glass-black.svg"

  /** @description Boolean para exibit ou não a barra de input */
  b_Show_Input: boolean

  /**@description recebe true quando o usuário clica no primeiro item do popover */
  onClick_Top: boolean

  /** @description Boolean para exibir ou não a logo e os itens */
  b_Show_Logo: boolean = true

  /** @description Boolean para exibir o Input no desktop */
  b_Show_Input_Desktop: boolean

  /** @description Recebe a largura atual da tela */
  nr_Width: number

  /**@description True quando o usuário logado for adimin */
  b_User_Admin: boolean = false

  /** @description Subject para destruir os subscribers */
  subject_unsub = new Subject()

  /** @description Subject para destruir os subscribers */
  b_Show_Modal: boolean = false

  @ViewChild('search') searchElement: ElementRef
  @Input() control = new FormControl()

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
    this.onResize()
  }

  @HostListener('window:resize')
  onResize() {
    this.nr_Width = window.innerWidth
    if (this.nr_Width >= 1280) {
      this.b_Show_Input_Desktop = true
      this.b_Show_Modal = false
    } else {
      this.b_Show_Input_Desktop = false
    }
  }

  Show_Input() {
    if (this.nr_Width < 1280) {
      this.b_Show_Logo = !this.b_Show_Logo
      this.b_Show_Input = !this.b_Show_Input
      if (this.b_Show_Input == true) {
        this.nm_Src_Icon = "assets/icons/arrow-left.svg"
      } else {
        this.nm_Src_Icon = "assets/icons/search-glass-black.svg"
      }
    }
  }

  onFilter_Popover(event){
    this.onClick_Top = event
    if(this.onClick_Top){
      this.b_Show_Modal = true
    }else{
      this.b_Show_Modal = false
    }
  }

  Show_Modal(){
    this.b_Show_Modal = true
  }

  ngOnDestroy() {
    this.subject_unsub.next(true)
    this.subject_unsub.complete()
  }

  Back(){
    this.location.back();
  }

}
