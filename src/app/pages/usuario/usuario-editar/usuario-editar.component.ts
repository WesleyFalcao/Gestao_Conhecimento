import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListModel } from 'src/app/models/arraylist/array-list';
import { UsuarioParams } from 'src/app/models/usuario/usuario.model';
import { SubjectService } from 'src/app/services/subject.service';
import { UsuariosService } from '../usuarios.service';

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
  ds_Titulo: string = "Editar Usuário"

  /**@description Nome do label do selection input */
  nm_Label_Selection_Input_Perfil: string = "Perfil"

  /**@description Nome do label do selection input */
  nm_Label_Selection_Input_Ativo: string = "Status"

  /**@description Nome do label do selection input */
  nm_Label_Selection_Input_Usuario: string = "Logar com usuário do computador?"

  /**@description Nome do label do input */
  nm_Label_Input_Usuario: string = "Nome de usuário"

  /**@description Nome do label do input */
  nm_Label_Input_Senha: string = "Senha"

  /**@description Recebe o parâmetro da rota */
  cd_Id_Param: Number

  /**@description Recebe o parâmetro da rota */
  subject_unsub: Subscription

  /**@description Recebe os valores de cada input */
  obj_Filds_Input = new UsuarioParams

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuariosService,
    private subjectService: SubjectService,
  ) { }

  Value_Select_AD(iten){
    if(iten.nome == "Sim"){
      this.obj_Filds_Input.b_login_ad = true
    }else{
      this.obj_Filds_Input.b_login_ad = false
    }
  }
  Value_Select_Perfil(iten){
    if(iten.nome == "Administrador"){
      this.obj_Filds_Input.cd_perfil = 1
    } else if(iten.nome == "Usuario"){
      this.obj_Filds_Input.cd_perfil = 2
    }
    console.log(this.obj_Filds_Input.cd_perfil = 2)
  }
  Value_Select_Status(iten){
    if(iten.nome == "Inativo"){
      const data = new Date()
      const dia = String(data.getDate()).padStart(2, '0')
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      const dataAtual = ano + '-' + mes + '-' + dia;
      this.obj_Filds_Input.dt_bloqueio = dataAtual
      
    }else{
      this.obj_Filds_Input.dt_bloqueio = null
    }
  }

  async ngOnInit() {
    this.subject_unsub = this.route.params.subscribe((param: any)=>{
      this.cd_Id_Param = param['id']
    })

    const responseuser = await this.usuarioService.Get_Usuario(this.cd_Id_Param)
    this.obj_Filds_Input = responseuser.data.usuarios[0]

    const responseperfil = await this.usuarioService.Get_Perfil_Usuario()
    this.objArrayPerfil = responseperfil.data.perfis
  }

  async Set_Edit_User(){
    const responseedituser = await this.usuarioService.Set_Edit_Usuario(this.obj_Filds_Input)
  }

  ngOnDestroy() {
    this.subject_unsub.unsubscribe()
  }
}
