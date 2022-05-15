import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adicionar-users',
  templateUrl: './adicionar-users.component.html',
  styleUrls: ['./adicionar-users.component.scss']
})
export class AdicionarUsersComponent implements OnInit {

  nm_Label_Input: string = "Nome do usuário"

  nm_Label_Perfil: string = "Nome do usuário"

  nm_Label_Ativo: string = "Nome do usuário"
  
  nm_Label_Logar: string = "Nome do usuário"

  constructor() { }

  ngOnInit(): void {
  }

}
