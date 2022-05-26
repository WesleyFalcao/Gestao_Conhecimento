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
    // this.subjectService.subject_Exibindo_Loading.next(true)
    const query = this.usuarioQuery.Get_Usuarios_Listagem()
    console.log(param)
    const response = await this.apiHasuraService._Execute(query, param, this.httpOptions)
    this.subjectService.subject_Exibindo_Loading.next(false)

    return response.data.usuarios
  }
}
