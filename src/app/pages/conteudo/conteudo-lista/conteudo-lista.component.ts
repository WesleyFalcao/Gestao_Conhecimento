import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-conteudo-lista',
  templateUrl: './conteudo-lista.component.html',
  styleUrls: ['./conteudo-lista.component.scss']
})
export class ConteudoEditarListaComponent implements OnInit {

  /**@description Título da página */
  ds_Titulo: string = "Conteúdos"

  /**@description boolean que exibe os itens da listagem quando não é card */
  b_Show_Itens: boolean = false

  /**@description recebe a largura atual da tela */
  nr_Width: number

  /**@description boolean que fica true acima de 1034px */
  b_Width: boolean

  /**@description Recebe o valor digitado pelo usuário no desktop */
  Input_Value: string

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  /**@description Objeto que recebe o conteudo dos inputs */
  objFilter = { nm_Nome: "", nm_Usuario: "", nm_Status:"", nm_Grupo:"" }

  constructor(private eRef: ElementRef) { }

  ngOnInit(): void {
    this.onResize()
  }

  obj_Array_Conteudos = [
    {
      titulo: "O mundo é lindo igual o Wesley",
      id: 1,
      descricao: "tema da bienal Rubem Braga no ano de 2019 na qual",
      link: "http://localhost:4200/conteudo-editar-lista",
      grupo: "Cedusc",

    },
    {
      titulo: "O mundo é lindo eu alguns casos porem contudo",
      id: 23,
      descricao: "tema da bienal Rubem Braga no ano de 019 na qual",
      link: "http://localhost:400/conteudo-editar-lista",
      grupo: "Cedusc",

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

  Close_Modal(){
    this.b_Show_Filter = false
  }

  Filtrar(){
    console.log(this.objFilter)
    this.b_Show_Filter = false
  } 

  Show_Modal(event){
    this.b_Show_Filter = event
  }

}
