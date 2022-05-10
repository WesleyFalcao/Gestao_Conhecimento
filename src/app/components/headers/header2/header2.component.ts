import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.scss']
})
export class Header2Component implements OnInit {

  /** @description String que armazena o caminho do SVG */
  nm_Src_Icon: string = "assets/icons/search-glass-black.svg"

  /** @description Boolean para exibit ou não a barra de input */
  b_Show_Input: boolean

  /** @description Boolean para exibir ou não a logo e os itens */
  b_Show_Logo: boolean = true

  /** @description Boolean para exibir o Input no desktop */
  b_Show_Input_Desktop: boolean

  /** @description Recebe a largura atual da tela */
  nr_Width: number

  /** @description Subject para destruir os subscribers */
  subject_unsub = new Subject()

  /** @description Subject para destruir os subscribers */
  b_Show_Modal: boolean = false

  @ViewChild('search') searchElement: ElementRef
  @Input() control = new FormControl()

  constructor(
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

  Show_Modal(){
    this.b_Show_Modal = true
  }

  ngOnDestroy() {
    this.subject_unsub.next(true)
    this.subject_unsub.complete()
  }
}
