
import { Injectable } from '@angular/core';
import { UsuarioParams } from '../models/usuario/usuario.model';
import { HomeQuery } from '../queries/home.query';
import { UsuarioQuery } from '../queries/usuario.query';
import { ApiHasuraService } from '../services/hasura.service';
import { SubjectService } from '../services/subject.service';

@Injectable({
  providedIn: 'root'
})
export class HomeRepository {

  /** @description Options da Requisição */
  httpOptions: any;

  constructor(
    private subjectService: SubjectService,
    private homeQuery: HomeQuery,
    private apiHasuraService: ApiHasuraService
  ) { }

  async Get_Conteudo(param){
    this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.homeQuery.Get_Conteudo()
    const response = await this.apiHasuraService._Execute(query, {param}, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)
    return response
  }
}
