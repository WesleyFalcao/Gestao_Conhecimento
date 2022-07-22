
import { Injectable } from '@angular/core';
import { CategoriaQuery } from '../queries/categoia.query';
import { ApiHasuraService } from '../services/hasura.service';
import { SubjectService } from '../services/subject.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaRepository {

  /** @description Options da Requisição */
  httpOptions: any;

  constructor(
    private categoriaQuery: CategoriaQuery,
    private subjectService: SubjectService,
    private apiHasuraService: ApiHasuraService
  ) { }

  async Get_Categories_Paginator(param){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.categoriaQuery.Get_Categories_Paginator()
    const variables = { limit: param.page_lenght, offset: ((param.nr_pagina - 1)*param.page_lenght)}
    const response = await this.apiHasuraService._Execute(query, variables,this.httpOptions)
    
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Get_Categories_List(){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.categoriaQuery.Get_Categories_List()
    const response = await this.apiHasuraService._Execute(query, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Get_Categories_And_Icons(){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.categoriaQuery.Get_Categories_And_Icons()
    const response = await this.apiHasuraService._Execute(query, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Get_Category_And_Icon(param){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.categoriaQuery.Get_Category_And_Icon()
    const variables = {cd_categoria: param }
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Get_Category(param){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.categoriaQuery.Get_Category()
    const variables = {cd_categoria: param }
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Set_Add_Icon(objparam){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.categoriaQuery.Set_Add_Icon()
    const variables = {nm_file: objparam.nm_iconBase64, cd_categoria: objparam.cd_categoria}
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }

  async Set_Add_Category(nm_Categoria){
    const query = this.categoriaQuery.Set_Add_Category()
    const variables = {nm_categoria: nm_Categoria}
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    return response
  }

  async Set_Edit_Category(nm_Categoria, cd_Id_Param){
    const query = this.categoriaQuery.Set_Edit_Category()
    const variables = { nm_categoria : nm_Categoria, "cd_categoria": cd_Id_Param}
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    return response
  }
  
  async Set_Delete_Icon(param){
    const query = this.categoriaQuery.Set_Delete_Icon()
    const variables = { cd_categoria : param}
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    return response
  }
}
