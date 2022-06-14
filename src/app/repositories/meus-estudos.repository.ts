
import { Injectable } from '@angular/core';
import { MeusEstudosQuery } from '../queries/meus-estudos.query';
import { UsuarioQuery } from '../queries/usuario.query';
import { ApiHasuraService } from '../services/hasura.service';
import { SubjectService } from '../services/subject.service';

@Injectable({
  providedIn: 'root'
})
export class MeusEstudosRepository {

  /** @description Options da Requisição */
  httpOptions: any;

  constructor(
    private subjectService: SubjectService,
    private meusEstudosQuery: MeusEstudosQuery,
    private apiHasuraService: ApiHasuraService
  ) { }

  async Get_My_Studies(){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.meusEstudosQuery.Get_My_Studies()
    const response = await this.apiHasuraService._Execute(query, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Get_Cd_Studies(){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.meusEstudosQuery.Get_Cd_Studies()
    const response = await this.apiHasuraService._Execute(query, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Set_My_Study(estudo){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.meusEstudosQuery.Set_My_Studies()
    const variables = { cd_conteudo: estudo }
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Delete_My_Study(estudo){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.meusEstudosQuery.Delete_My_Study()
    const variables = {cd_conteudo: estudo}
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }
}
