import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-adicionar-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent implements OnInit {

  /**@description recebe a largura atual da tela */
  nr_Width: number

  constructor() { }

  ngOnInit(): void {
    this.onResize()
  }

  objArrayTeste = [
    {
      nome: "CEDUSC",
      id: 1,
      usuario: "wesleyfa",
      perfil: "wesleyfa",
      status: "ativo",
      b_iten: true
    },
    {
      nome: "COMPLICE",
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
  }
}
