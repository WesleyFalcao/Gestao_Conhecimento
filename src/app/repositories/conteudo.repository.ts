
import { Injectable } from '@angular/core';
import { UsuarioParams } from '../models/usuario/usuario.model';
import { ConteudoQuery } from '../queries/conteudo.query';
import { SugestoesQuery } from '../queries/sugestoes.query';
import { UsuarioQuery } from '../queries/usuario.query';
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
    private apiHasuraService: ApiHasuraService
  ) { }

  async Get_Conteudos(){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.conteudoQuery.Get_Conteudo_Listagem()
    const response = await this.apiHasuraService._Execute(query, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }
  
  async Get_Conteudo(param){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.conteudoQuery.Get_Conteudo()
    const variables = { cd_conteudo:param }
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
    console.log(response)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }
}
