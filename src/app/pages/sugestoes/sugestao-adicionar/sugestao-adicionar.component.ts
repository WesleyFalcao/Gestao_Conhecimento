import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-sugestao-adicionar',
  templateUrl: './sugestao-adicionar.component.html',
  styleUrls: ['./sugestao-adicionar.component.scss']
})

export class SugestaoAdicionarComponent implements OnInit {

  /**@description Boolean para controlar a animação */
  Send_Sugestion_Animacao: boolean = false

  /**@description string que passa o título da página */
  ds_Titulo: string = "Adicionar sugestão"

  /**@description Boolean para remover a barra de pesquisa */
  b_Not_Search: boolean = true

  constructor(
    private subject_service: SubjectService,
    private location: Location
    ) { }

  ngOnInit(): void {
  }

  Back(){
    this.location.back();
  }
  
  Send_Sugestion(){
    this.subject_service.subject_Exibindo_Animation_Send.next(true)
    this.Send_Sugestion_Animacao = true
  }
}
