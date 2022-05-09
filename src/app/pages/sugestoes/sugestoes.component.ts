import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sugestoes',
  templateUrl: './sugestoes.component.html',
  styleUrls: ['./sugestoes.component.scss']
})
export class SugestoesComponent implements OnInit {

  /**@description Bolean para exibir svg de okay no check-box */
  b_Okay: boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
