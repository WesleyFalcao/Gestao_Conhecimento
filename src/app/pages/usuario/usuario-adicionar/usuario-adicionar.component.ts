import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-adicionar-users',
  templateUrl: './usuario-adicionar.component.html',
  styleUrls: ['./usuario-adicionar.component.scss']
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

  /**@description Boolean para remover a barra de pesquisa */
  b_Not_Search: boolean = true

  /**@description Nome do label do selection input */
  nm_Label_Selection_Input_Perfil: string = "Perfil"

  /**@description Nome do label do selection input */
  nm_Label_Selection_Input_Ativo: string = "Status"

  /**@description Nome do label do selection input */
  nm_Label_Selection_Input_Usuario: string = "Login com usuário AD?"

  /**@description Nome do label do selection input */
  ds_Titulo: string = "Adicionar Usuário"

  Back(){
    this.location.back();
  }
  
  constructor(private location: Location) { }

  ngOnInit(): void {
  }

}
