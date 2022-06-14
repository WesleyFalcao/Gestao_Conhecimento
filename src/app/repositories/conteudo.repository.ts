import { Injectable } from '@angular/core';
import { ConteudoQuery } from '../queries/conteudo.query';
import { DateService } from '../services/date.service';
import { ApiHasuraService } from '../services/hasura.service';
import { SubjectService } from '../services/subject.service';

@Injectable({
  providedIn: 'root'
})
export class ConteudoRepository {

  /** @description Options da Requisição */
  httpOptions: any;

  constructor(
    private subjectService: SubjectService,
    private conteudoQuery: ConteudoQuery,
    private dateService: DateService,
    private apiHasuraService: ApiHasuraService
  ) { }

  async Get_Conteudos(param){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.conteudoQuery.Get_Conteudo_Listagem()
    const variables = {limit: param.page_lenght, offset: ((param.nr_pagina - 1)*param.page_lenght)}
    const response = await this.apiHasuraService._Execute(query,variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Get_Conteudos_Filter(param, input){

    this.subjectService.subject_Exibindo_Loading.next(true)
    let where: any = {_or: []}

    if(input != null && input != ""){
      where._or.push({categoria: {nm_categoria: {_ilike: "%" + input + "%"}}}) 
      where._or.push({nm_titulo: {_ilike: "%" + input + "%"}})
      where._or.push({ds_conteudo: {_ilike: "%" + input + "%"}})
    }
    
    const query = this.conteudoQuery.Get_Conteudos_Filter()
    const variables = {where, limit: param.page_lenght, offset: ((param.nr_pagina - 1) * param.page_lenght)}
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }
  
  async Get_Conteudo(param){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.conteudoQuery.Get_Conteudos()
    const variables = { cd_conteudo: param }
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Get_Conteudo_Edit(param){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.conteudoQuery.Get_Conteudo_Edit()
    const variables = { cd_conteudo: param }
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Get_Sumary(){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.conteudoQuery.Get_Sumary() 
    const response = await this.apiHasuraService._Execute(query, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Set_Sumary(param){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.conteudoQuery.Set_Sumary()
    const variables = {ds_descricao: param.categoria.nome, nm_titulo: param.ds_conteudo}
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
   
  }

  async Set_Add_Conteudo(param){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.conteudoQuery.Set_Add_Conteudo()
    const variables = {"nm_titulo": param.nm_Titulo , "ds_conteudo": param.nm_Descricao, "ds_link": param.ds_Link, "cd_categoria": param.cd_Categoria}
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Set_Edit_User(objparam, idconteudo){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.conteudoQuery.Set_Edit_User()
    const variables = {"cd_conteudo": idconteudo, "nm_titulo": objparam.nm_titulo, "ds_conteudo": objparam.ds_conteudo, "ds_link": objparam.ds_link, "cd_categoria": objparam.categoria.id}
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Set_Update_Conteudo(param){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const currentdate = this.dateService.Get_Date()
    const query = this.conteudoQuery.Set_Update_Conteudo()
    const variables = {cd_conteudo: param, dt_exclusao: currentdate}
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Set_Gravar_Dados(param){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.conteudoQuery.Set_Gravar_Dados()
    const variables = {cd_conteudo: param.cd_Conteudo, nm_usuario: param.nm_Usuario }
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }  
}
