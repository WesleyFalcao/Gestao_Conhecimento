import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sugestoes',
  templateUrl: './sugestoes.component.html',
  styleUrls: ['./sugestoes.component.scss']
})
export class SugestoesComponent implements OnInit {

  /**@description como o nome da opção que aparece por cima no popover */
  nm_Opcao_top: string = "Minhas sugestões: 2"

  /**@description como o nome da opção que aparece por baixo no popover */
  nm_Opcao_bottom: string = "Total: 2"

  /**@description define um comportamento diferente para o popover quando esta na tela de usuários */
  b_Rotate_Triangle: boolean = true

 /**@description boolean para abrir ou fechar o popover */
  b_Show_Popover: boolean = false

  /**@description Bolean para exibir svg de okay no check-box */
  b_Okay: boolean = false

  /**@description Number que vai receber o número de sugestões cadastradas pelo usuário */
  nr_Minhas_Sugestoes: number = 6

  /**@description Number que vai receber o total de sugestões */
  nr_Total_Sugestoes: number = 20

  ds_Titulo: string = "Sugestões"

  constructor() { }

  ngOnInit(): void {
  }

}
