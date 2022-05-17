import { Location } from '@angular/common';
import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'header-no-search',
  templateUrl: './header-no-search.component.html',
  styleUrls: ['./header-no-search.component.scss']
})
export class HeaderNoSearchComponent implements OnInit {

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
  b_User_Admin: boolean = true

  /** @description Subject para destruir os subscribers */
  subject_unsub = new Subject()

  /** @description Subject para destruir os subscribers */
  b_Show_Modal: boolean = false

  @ViewChild('search') searchElement: ElementRef
  @Input() control = new FormControl()

  constructor(
    private location: Location,
    private route: Router,
    private eRef: ElementRef
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

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {

    } else {
      this.b_Show_Popover = false;
    }
  }

  onFilter_Popover(event) {
    this.onClick_Top = event
    if (this.onClick_Top) {
      this.b_Show_Modal = true
    } else {
      this.b_Show_Modal = false
    }
  }

  Show_Modal() {
    this.b_Show_Modal = true
  }

  ngOnDestroy() {
    this.subject_unsub.next(true)
    this.subject_unsub.complete()
  }

  Back() {
    this.location.back();
  }

  onClick_Usuario() {
    this.route.navigate(['/usuarios'])
    this.b_Show_Popover = false
  }
  onClick_Conteudos() {
    this.route.navigate(['/conteudo-editar-lista'])
    this.b_Show_Popover = false
  }
  onClick_Categorias() {
    this.route.navigate(['/categorias'])
    this.b_Show_Popover = false
  }
}
