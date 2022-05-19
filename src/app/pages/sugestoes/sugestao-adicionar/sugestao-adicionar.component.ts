import { Component, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-sugestao-adicionar',
  templateUrl: './sugestao-adicionar.component.html',
  styleUrls: ['./sugestao-adicionar.component.scss']
})
export class SugestaoAdicionarComponent implements OnInit {

  Send_Sugestion_Animacao: boolean = false

  /**@description string que passa o noe do label do input */
  nm_Label_Input_Titulo: string = "Título"

  /**@description string que passa o noe do label do input */
  nm_Label_Input_Descricao: string = "Título"

  /**@description string que passa o título da página */
  ds_Titulo: string = "Adicionar sugestão"

  constructor(private subject_service: SubjectService) { }

  ngOnInit(): void {
  }

  Send_Sugestion(){
    this.subject_service.subject_Exibindo_Animation_Send.next(true)
    this.Send_Sugestion_Animacao = true
  }
}
