import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-sugestoes',
  templateUrl: './sugestoes.component.html',
  styleUrls: ['./sugestoes.component.scss']
})
export class SugestoesComponent implements OnInit {

  /**@description Título da página */
  ds_Titulo: string = "Sugestões"

  /**@description Bolean para exibir svg de okay no check-box */
  b_Okay: boolean = false

  /**@description Number que vai receber o número de sugestões cadastradas pelo usuário */
  nr_Minhas_Sugestoes: number = 6

  /**@description Number que vai receber o total de sugestões */
  nr_Total_Sugestoes: number = 20

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  b_Popover_Sugestoes: boolean = true

  /**@description boolean para abrir ou fechar o popover */
  b_Show_Popover_Feitos: boolean = false

  /**@description Objeto que recebe o conteudo dos inputs */
  objFilter = { nm_Titulo: "", nm_Descricao: "" }

  constructor(
    private eRef: ElementRef
  ) { }

  ngOnInit(): void {
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      
    } else {
      this.b_Show_Popover_Feitos = false
    }
  }

  Show_Modal(event) {
    this.b_Show_Filter = event
  }

  Close_Modal() {
    this.b_Show_Filter = false
  }

  Filtrar() {
    this.b_Show_Filter = false
    console.log(this.objFilter)
  }
}
