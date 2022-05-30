
import { Injectable } from '@angular/core';
import { UsuarioParams } from '../models/usuario/usuario.model';
import { UsuarioQuery } from '../queries/usuario.query';
import { ApiHasuraService } from '../services/hasura.service';
import { SubjectService } from '../services/subject.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRepository {

  /** @description Options da Requisição */
  httpOptions: any;

  constructor(
    private subjectService: SubjectService,
    private usuarioQuery: UsuarioQuery,
    private apiHasuraService: ApiHasuraService
  ) { }

  async Get_Usuarios(param: UsuarioParams){
    let where:any = {
      //type: {_eq: 2}
    };

    if(param.cd_usuario != undefined){

    }

    if(param.nm_usuario != undefined){

    }

    if(param.cd_login != undefined){
      
    }

    if(param.dt_bloqueio != undefined){
      where = {dt_bloqueio: {_is_null: false}}
    }

    /**@description where para trazer os não bloqueados */
    //where: {dt_bloqueio: {_is_null: true}}

    /**@description where para trazer os bloqueados */
    //where: {dt_bloqueio: {_is_null: false}}

    /**@description where para um usuario pelo nome */
    //where: {cd_login: {_eq: "ana"}}
    
    console.log("param", param)
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.usuarioQuery.Get_Usuarios_Listagem_Paginacao()
    const variables = { where, limit: param.page_lenght, offset: ((param.nr_pagina - 1)*param.page_lenght)}
    console.log("offset", variables.offset)
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }
}
