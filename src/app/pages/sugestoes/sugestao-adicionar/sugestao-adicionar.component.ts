import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { SubjectService } from 'src/app/services/subject.service';
import { SugestoesService } from '../sugestoes.service';

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

  /**@description String que contém a mensagem do modal de alerta */
  ds_Alert_Descricao: string = "Os campos não podem estar vazios!"

  /**@description Boolean para remover a barra de pesquisa */
  b_Not_Search: boolean = true

  /**@description Recebe o nome do usário que adicionou a sugestão */
  cd_User: string
  
  /**@description Boolean mostra o modal de alerta */
  b_Alert_Modal: boolean = false

  /**@description Objeto que recebe o conteudo dos inputs */
  obj_Add_Suggestion: any = { nm_Titulo: null, nm_Descricao: null, cd_Usuario: null}

  constructor(
    private subject_service: SubjectService,
    private location: Location,
    private loginService: LoginService,
    private sugestaoService: SugestoesService,
    private subjectService: SubjectService

    ) { }

  ngOnInit(): void {
    this.cd_User = this.loginService.Id_User_Logged()
  }

  Back(){
    this.location.back();
  }
  
  async Send_Sugestion(){

    this.obj_Add_Suggestion.cd_Usuario = this.cd_User
 
    const responsesuggestion = await this.sugestaoService.Set_Add_Suggestion(this.obj_Add_Suggestion)
    if(responsesuggestion == false){
      this.b_Alert_Modal = true
      this.ds_Alert_Descricao = "Todos os campos devem ser preenchidos!"  
    }

    if(responsesuggestion.errors){
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível adicionar' })
    }
    else{
      this.Send_Sugestion_Animacao = true
      setTimeout(() => {
        this.Send_Sugestion_Animacao = !this.Send_Sugestion_Animacao
      }, 3000);   
    }
  }

  Closed_Alert_Modal() {
    this.b_Alert_Modal = false
  }
}
