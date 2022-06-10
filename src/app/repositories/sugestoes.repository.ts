import { Injectable } from '@angular/core';
import { SugestoesQuery } from '../queries/sugestoes.query';
import { DateService } from '../services/date.service';
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
    private dateService: DateService,
    private apiHasuraService: ApiHasuraService,
  ) { }

  async Get_Suggestions_Admin() {
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.sugestoesQuery.Get_Suggestions_Admin()
    const response = await this.apiHasuraService._Execute(query, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Get_Files_Suggestion(param){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.sugestoesQuery.Get_Files_Suggestion()
    const variables = {limit: param.page_lenght, offset: ((param.nr_pagina - 1)*param.page_lenght)}
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Get_Filter_Suggestion(filtersugestao){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.sugestoesQuery.Filter_Suggestion()

    let where: any = {_or: {}}
    if(filtersugestao.cd_sugestao != null && filtersugestao.cd_sugestao != ""){
      where._or.cd_sugestao = {_eq: filtersugestao.cd_sugestao}
    }
    if(filtersugestao.nm_Titulo != null && filtersugestao.nm_Titulo != ""){
      where._or.nm_titulo = {_ilike: "%" + filtersugestao.nm_Titulo.replace(" " ,"%") + "%"}
    }
    if(filtersugestao.nm_Descricao != null && filtersugestao.nm_Descricao != ""){
      where._or.ds_sugestao = {_ilike: "%" + filtersugestao.nm_Descricao.replace(" " ,"%") + "%"}
    }

    const variables = {where}
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }
  
  async Set_Add_Suggestion(addsugestion){
    const query = this.sugestoesQuery.Set_Add_Suggestion()
    const variables = { titulo: addsugestion.nm_Titulo, descricao: addsugestion.nm_Descricao }
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    return response
  }

  async Set_Unarchive_Suggestion(cd_Sugestao){
    const query = this.sugestoesQuery.Set_Unarchive_Suggestion()
    const variables = {cd_sugestao: cd_Sugestao}
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    return response
  }

  async Set_File_Suggestion(sugestao: any) {
    const currentdate = this.dateService.Get_Date()
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.sugestoesQuery.Set_File_Suggestion()
    const variables = { data: currentdate, cd_sugestao: sugestao }
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }
}
