import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.scss']
})
export class EditarUserComponent implements OnInit {

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
  ds_Titulo: string = "Editar Usuário"

  /**@description Nome do label do selection input */
  nm_Label_Selection_Input_Perfil: string = "Perfil"

  /**@description Nome do label do selection input */
  nm_Label_Selection_Input_Ativo: string = "Status"

  /**@description Nome do label do selection input */
  nm_Label_Selection_Input_Usuario: string = "Logar com usuário do computador?"

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
