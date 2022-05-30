
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
    private apiHasuraService: ApiHasuraService
  ) { }

  async Set_Category(nm_Categoria){
    const query = this.categoriaQuery.Set_Category()
    const variables = {"nm_categoria": nm_Categoria}
    const response = await this.apiHasuraService._Execute(query, variables, this.httpOptions)
    return response
  }
}
