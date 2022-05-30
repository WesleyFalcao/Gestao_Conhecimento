
import { Injectable } from '@angular/core';
import { SugestoesQuery } from '../queries/sugestoes.query';
import { ApiHasuraService } from '../services/hasura.service';
import { SubjectService } from '../services/subject.service';

@Injectable({
  providedIn: 'root'
})
export class SugestoesRepository {

  /** @description Options da Requisição */
  httpOptions: any;

  constructor(
    private subjectService: SubjectService,
    private sugestoesQuery: SugestoesQuery,
    private apiHasuraService: ApiHasuraService
  ) { }

  async Get_Suggestion() {
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.sugestoesQuery.Get_Suggestion()
    const response = await this.apiHasuraService._Execute(query, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Get_Files_Suggestion(){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.sugestoesQuery.Get_Files_Suggestion()
    const response = await this.apiHasuraService._Execute(query, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Get_Filter_Suggestion(filtersugestao){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.sugestoesQuery.Filter_Suggestion()
    const variables = {}
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }
  

  async Set_Add_Suggestion(addsugestion){
    const query = this.sugestoesQuery.Set_Add_Suggestion()
    const variables = {"titulo": addsugestion.nm_Titulo, "descricao": addsugestion.nm_Descricao}
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    return response
  }

  async Set_Unarchive_Suggestion(cd_Sugestao){
    const query = this.sugestoesQuery.Set_Unarchive_Suggestion()
    const variables = {"cd_sugestao": cd_Sugestao}
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    return response
  }

  async Set_File_Suggestion(sugestao: any) {
    const data = new Date()
    const dia = String(data.getDate()).padStart(2, '0')
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = ano + '-' + mes + '-' + dia;
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.sugestoesQuery.Set_File_Suggestion()
    const variables = { data: dataAtual, cd_sugestao: sugestao }
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }
}
