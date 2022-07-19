import { Location } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { LoginService } from 'src/app/services/login.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  /**@description Boolean para remover a barra de pesquisa */
  @Input() b_Not_Search: boolean

  /**@description Boolean retirar botão de voltar */
  @Input() b_Nao_Exibir_Voltar: boolean

  /**@description Boolean de refresh */
  @Input() b_Input_Open : boolean

  /**@description Contém o valor do input */
  @Input() nm_Input: string

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

  /**@description True quando o usuário logado for admin */
  b_User_Admin: boolean = true

  /** @description Subject para destruir os subscribers */
  subject_unsub = new Subject()

  /** @description Subject para destruir os subscribers */
  b_Show_Modal: boolean = false

  /** @description Emite o conteúdo digitado na barra de pesquisa */
  @Output() Input_Emit_Value = new EventEmitter()

  /** @description Recebe o conteúdo digitado na barra de pesquisa  */
  Input_Value: any = null

  /** @description Usado para o debounce */
  modelChanged = new FormControl()

  constructor(
    private dataService: DataService,
    private location: Location,
    private route: Router,
    private subjectService: SubjectService,
    private eRef: ElementRef,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    const role_user = this.loginService.Name_Role()
    if (role_user == "user") {
      this.b_User_Admin = false
    }
    this.onResize()
    this.modelChanged.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(async (input) => {
      this.Input_Value = input
      this.nm_Input = input
      this.Input_Emit_Value.emit(this.Input_Value)
    })

    if(this.b_Input_Open == true){
      this.Show_Input() 
    }
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

  Show_Input() {

    if (this.nr_Width < 1280) {
      this.b_Show_Logo = !this.b_Show_Logo
      this.Input_Value = null
      this.b_Show_Input = !this.b_Show_Input
      if (this.b_Show_Input == true) {
        this.nm_Src_Icon = "assets/icons/arrow-left.svg"
      } else {
        this.nm_Src_Icon = "assets/icons/search-glass-black.svg"
      }
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

  Logout() {
    this.dataService.Limpar_Local()
    this.route.navigate(['']);
  }

  Back() {
    this.location.back();
  }

  onClick_Usuario() {
    this.route.navigate(['/usuarios'])
    this.b_Show_Popover = false
  }

  onClick_Conteudos() {
    this.route.navigate(['/conteudo-lista'])
    this.b_Show_Popover = false
  }

  onClick_Categorias() {
    this.route.navigate(['/categorias'])
    this.b_Show_Popover = false
  }

  onClick_Report() {
    this.route.navigate(['/report'])
    this.b_Show_Popover = false
  }

  ngOnDestroy() {
    this.subject_unsub.next(true)
    this.subject_unsub.complete()
  }
}
