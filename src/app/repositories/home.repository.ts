
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
  ) { }

}
