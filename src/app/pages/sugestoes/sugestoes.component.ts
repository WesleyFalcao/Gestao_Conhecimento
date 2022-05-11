import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sugestoes',
  templateUrl: './sugestoes.component.html',
  styleUrls: ['./sugestoes.component.scss']
})
export class SugestoesComponent implements OnInit {

  /**@description Bolean para exibir svg de okay no check-box */
  b_Okay: boolean = false

  /**@description Number que vai receber o número de sugestões cadastradas pelo usuário */
  nr_Minhas_Sugestoes: number = 6

  /**@description Number que vai receber o total de sugestões */
  nr_Total_Sugestoes: number = 20

  constructor() { }

  ngOnInit(): void {
  }

}
