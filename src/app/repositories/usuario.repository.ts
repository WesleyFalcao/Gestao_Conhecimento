
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
  
  async Get_Usuario(param){
    const query = this.usuarioQuery.Get_Usuario()
    const variables = {"cd_usuario": param}
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Get_Perfil_Usuario(){
    const query = this.usuarioQuery.Get_Perfil_Usuario()
    const response = await this.apiHasuraService._Execute(query, this.httpOptions)
    return response
  }

  async Set_Add_Usuario(param){
    const query = this.usuarioQuery.Set_Add_Usuario()
    const variables = {"nm_usuario": param.nm_usuario , "ds_senha": param.ds_senha , "b_login_ad": param.b_login_ad, "cd_login": param.cd_login, "cd_perfil": param.cd_perfil }
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Set_Edit_Usuario(objparam){
    console.log(objparam)
    const query = this.usuarioQuery.Set_Edit_Usuario()
    const variables = {"cd_usuario": objparam.cd_usuario, "b_login_ad": objparam.b_login_ad ,"cd_login": objparam.cd_login, "cd_perfil": objparam.cd_perfil, "ds_senha":objparam.ds_senha , "dt_bloqueio": objparam.dt_bloqueio}
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }
}
