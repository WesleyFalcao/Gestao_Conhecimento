import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UsuariosService } from '../usuarios.service';
import { ListModel } from 'src/app/models/arraylist/array-list';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-adicionar-users',
  templateUrl: './usuario-adicionar.component.html',
  styleUrls: ['./usuario-adicionar.component.scss']
})
export class AdicionarUsersComponent implements OnInit {

  /**@description objeto que recebe os perfil cadastrados no banco*/
  objArrayPerfil = []

  /**@description objeto que recebe as opções de usuario ad*/
  objArrayUsuarioAd: Array<ListModel> = [
    {
      nome: "Sim",
    },
    {
      nome: "Não",
    }
  ]

  /**@description Boolean para controlar a animação */
  Send_Sugestion_Animacao: boolean = false

  /**@description String que contém a mensagem do modal de alerta */
  ds_Alert_Descricao: string = ""

  /**@description Boolean mostra o modal de alerta */
  b_Alert_Modal: boolean = false

  /**@description objeto que recebe os valores dos input*/
  obj_Usuario = { nm_usuario: "", cd_login: null, ds_senha: "", b_login_ad: true, cd_perfil: 2 }

  /**@description Boolean para remover a barra de pesquisa */
  b_Not_Search: boolean = true

  /**@description Nome do label do selection input */
  nm_Label_Selection_Input_Perfil: string = "Perfil"

  /**@description Nome do label do selection input */
  nm_Label_Selection_Input_Ativo: string = "Status"

  /**@description Nome do label do selection input */
  nm_Label_Selection_Input_Usuario: string = "Login com usuário AD?"

  /**@description Nome do label do selection input */
  ds_Titulo: string = "Adicionar usuário"

  constructor(
    private location: Location,
    private usuarioService: UsuariosService,
    private subjectService: SubjectService
  ) { }

  async ngOnInit() {
    const responseperfil = await this.usuarioService.Get_Perfil_Usuario()
    this.objArrayPerfil = responseperfil.data.perfis
  }

  Value_Select_Perfil(event) {
    this.obj_Usuario.cd_perfil = event.id
  }

  Value_Select_AD(event) {
    if (event.nome == "Não") {
      this.obj_Usuario.b_login_ad = false

    } else {
      this.obj_Usuario.b_login_ad = true
    }
  }

  Closed_Alert_Modal() {
    this.b_Alert_Modal = false
  }

  Back() {
    this.location.back();
  }

  async Add_User() {
    const responseadduser = await this.usuarioService.Set_Add_Usuario(this.obj_Usuario)
    if(responseadduser == false) {
      this.b_Alert_Modal = true
      this.ds_Alert_Descricao = "Todos os campos devem ser preenchidos!"
    }
    if(responseadduser.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível adicionar' })
      this.obj_Usuario.ds_senha = ""
    }

    if(responseadduser.data.insert_usuarios.returning.length == 1){
      this.obj_Usuario.ds_senha = ""
      this.Send_Sugestion_Animacao = true
      setTimeout(() => {
        this.Send_Sugestion_Animacao = !this.Send_Sugestion_Animacao
      }, 3000);
    }
  }
}
