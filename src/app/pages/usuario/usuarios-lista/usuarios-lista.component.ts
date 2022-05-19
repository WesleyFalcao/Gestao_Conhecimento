import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.scss']
})

export class UsersComponent implements OnInit {

  /**@description boolean que exibe os itens da listagem quando não é card */
  b_Show_Itens: boolean = false

  /**@description recebe a largura atual da tela */
  nr_Width: number

  /**@description boolean que fica true acima de 1034px */
  b_Width: boolean

  /**@description Título da página */
  ds_Titulo: string = "Usuários"

  /**@description Recebe o valor digitado pelo usuário no desktop */
  Input_Value: string

  constructor(
    
    ) { }

  ngOnInit(): void {
    this.onResize()
    
  }

  obj_Array_Aux: any = [
    
  ]

  obj_Array_Usuarios = [
    {
      nome: "Ana Luiza",
      id: 1,
      usuario: "wesleyfa",
      perfil: "wesleyfa",
      status: "ativo",
      b_iten: true
    },
    {
      nome: "Ana luiza",
      id: 2,
      usuario: "brunop",
      perfil: "brunop",
      status: "ativo",
      b_iten: true
    },
    {
      nome: "Ana luiza",
      id: 2,
      usuario: "brunop",
      perfil: "brunop",
      status: "ativo",
      b_iten: true
    },
    {
      nome: "Ana luiza",
      id: 2,
      usuario: "brunop",
      perfil: "brunop",
      status: "ativo",
      b_iten: true
    },
  ]

  @HostListener('window:resize')
  onResize() {
    this.nr_Width = window.innerWidth
    if (this.nr_Width >= 1023) {
      this.b_Width = true
    } else {
      this.b_Width = false
    }
  }

  Show_Itens() {
    this.b_Show_Itens = !this.b_Show_Itens
  }

  onFilter_Search(iten){
    this.Input_Value = iten
  }
}
