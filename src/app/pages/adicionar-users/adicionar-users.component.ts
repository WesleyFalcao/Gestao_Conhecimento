import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adicionar-users',
  templateUrl: './adicionar-users.component.html',
  styleUrls: ['./adicionar-users.component.scss']
})
export class AdicionarUsersComponent implements OnInit {

  objArrayPerfil = [
    {
      nm_Nome: "Padrão"
    },
    {
      nm_Nome: "Administrador"
    }
  ]
  objArrayAtivo = [
    {
      nm_Nome: "Ativo"
    },
    {
      nm_Nome: "Inativo"
    }
  ]
  objArrayUsuarioComputador = [
    {
      nm_Nome: "Sim"
    },
    {
      nm_Nome: "Não"
    }
  ]

  /**@description Nome do label do selection input */
  nm_Label_Selection_Input_Perfil: string = "Perfil"

  /**@description Nome do label do selection input */
  nm_Label_Selection_Input_Ativo: string = "Status"

  /**@description Nome do label do selection input */
  nm_Label_Selection_Input_Usuario: string = "Logar com usuário do computador?"

  /**@description Nome do label do selection input */
  ds_Titulo: string = "Adicionar Usuário"

  /**@description Nome do label do input */
  nm_Label_Input_Nome: string = "Nome"

  /**@description Nome do label do input */
  nm_Label_Input_Usuario: string = "Nome de usuário"
  
 /**@description Nome do label do input */
  nm_Label_Input_Senha: string = "Senha"

  constructor() { }

  ngOnInit(): void {
  }

}
