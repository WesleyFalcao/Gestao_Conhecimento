import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListModel } from 'src/app/models/arraylist/array-list';
import { UsuarioParams } from 'src/app/models/usuario/usuario.model';
import { SubjectService } from 'src/app/services/subject.service';
import { UsuariosService } from '../usuarios.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-user',
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.scss']
})
export class EditarUserComponent implements OnInit, OnDestroy {

  objArrayPerfil: Array<ListModel> = []

  objArrayStatus: Array<ListModel> = [
    {
      nome: "Ativo"
    },
    {
      nome: "Inativo"
    }
  ]
  objArrayUsuarioAd: Array<ListModel> = [
    {
      nome: "Sim"
    },
    {
      nome: "Não"
    }
  ]

  /**@description Boolean para remover a barra de pesquisa */
  b_Not_Search: boolean = true

  /**@description Nome do label do selection input */
  ds_Titulo: string = "Editar usuário"

  /**@description Nome do label do selection input */
  nm_Label_Selection_Input_Perfil: string = "Perfil"

  /**@description Nome do label do selection input */
  nm_Label_Selection_Input_Ativo: string = "Status"

  /**@description Nome do label do selection input */
  nm_Label_Selection_Input_Usuario: string = "Logar com usuário AD?"

  /**@description Nome do label do input */
  nm_Label_Input_Usuario: string = "Nome de usuário"

  /**@description Nome do label do input */
  nm_Label_Input_Senha: string = "Senha"

  /**@description Recebe o parâmetro da rota */
  cd_Id_Param: Number

  /**@description Boolean para controlar a animação */
  Send_Sugestion_Animacao: boolean = false

  /**@description String que contém a mensagem do modal de alerta */
  ds_Alert_Descricao: string = ""

  /**@description Boolean mostra o modal de alerta */
  b_Alert_Modal: boolean = false

  /**@description Recebe o parâmetro da rota */
  subject_unsub: Subscription

  /**@description Recebe os valores de cada input */
  obj_Filds_Input = new UsuarioParams

  /**@description boolean para mostrar ou não a senha */
  b_Exibir_Password: boolean = false;

  /**@description objeto que passa os valores de inicialização para os campos de input */
  obj_Selection_Input = {
    sn_login_ad: {
      nome: "" 
    },
    nm_bloqueio: {
      nome: ""
    },
    nm_perfil: {
      nome: ""
    }
  }

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private usuarioService: UsuariosService,
    private subjectService: SubjectService,
  ) { }

  Value_Select_AD(iten) {
    if (iten.nome == "Sim") {
      this.obj_Filds_Input.b_login_ad = true
    } else {
      this.obj_Filds_Input.b_login_ad = false
    }
  }

  Value_Select_Perfil(iten) {
    this.obj_Filds_Input.cd_perfil = iten.id
  }

  Value_Select_Status(iten) {
    if (iten.nome == "Inativo") {
      const data = new Date()
      const dia = String(data.getDate()).padStart(2, '0')
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      const dataAtual = ano + '-' + mes + '-' + dia;
      this.obj_Filds_Input.dt_bloqueio = dataAtual
    } else {
      this.obj_Filds_Input.dt_bloqueio = null
    }
  }

  async ngOnInit() {
    this.subject_unsub = this.route.params.subscribe((param: any) => {
      this.cd_Id_Param = param['id']
    })

    const responseuser = await this.usuarioService.Get_Usuario(this.cd_Id_Param)
    this.obj_Filds_Input = responseuser.data.usuarios[0]

    const responseperfil = await this.usuarioService.Get_Perfil_Usuario()
    this.objArrayPerfil = responseperfil.data.perfis
    this.Insert_Values_Selection_Input()
  }

  Closed_Alert_Modal() {
    this.b_Alert_Modal = false
  }

  Back() {
    this.location.back();
  }

  async Set_Edit_User() {
    const responseedituser = await this.usuarioService.Set_Edit_Usuario(this.obj_Filds_Input)
    if (responseedituser == false) {
      this.b_Alert_Modal = true
      this.ds_Alert_Descricao = "Todos os campos devem ser preenchidos!"
    }

    if (responseedituser.errors) {
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível adicionar' })
      this.obj_Filds_Input.ds_senha = null
    }
    
    if (responseedituser.data.update_usuarios.returning.length) {
      this.obj_Filds_Input.ds_senha = null
      this.Send_Sugestion_Animacao = true
      setTimeout(() => {
        this.Send_Sugestion_Animacao = !this.Send_Sugestion_Animacao
        this.Back()
      }, 3000);
    }
  }

  Insert_Values_Selection_Input(){
    if(this.obj_Filds_Input.b_login_ad == false){
      this.obj_Selection_Input.sn_login_ad.nome = "Não"
    }else{
      this.obj_Selection_Input.sn_login_ad.nome = "Sim"
    }

    if(this.obj_Filds_Input.dt_bloqueio == null){
      this.obj_Selection_Input.nm_bloqueio.nome = "Ativo"
    }else{
      this.obj_Selection_Input.nm_bloqueio.nome = "Inativo"
    }

    this.obj_Selection_Input.nm_perfil.nome = this.obj_Filds_Input.perfil.nm_perfil
  }

  ngOnDestroy() {
    this.subject_unsub.unsubscribe()
  }
}
