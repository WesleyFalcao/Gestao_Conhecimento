import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeusEstudosModel } from 'src/app/models/meus-estudos/meus-estudos.model';
import { LoginService } from 'src/app/services/login.service';
import { SubjectService } from 'src/app/services/subject.service';
import { ConteudoService } from '../conteudo/conteudo.service';
import { MeusEstudosService } from '../meus-estudos/meus-estudos.service';

@Component({
  selector: 'app-meus-estudos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {

  /**@description Titulo da página */
  ds_Titulo: string = "Favoritos"

  /**@description Array que vai conter os estudos de cada usuário */
  obj_Array_Favoritos: Array<any>

  /**@description Boolean para exibir svg */
  b_User_Admin: boolean = true

  /**@description caminho com o svg do topo */
  nm_Svg_Top: string = "assets/icons/edit.svg"

  /**@description caminho com o svg de baixo */
  nm_Svg_Bottom: string = "assets/icons/lixeira.svg"

  /**@description como o nome da opção que aparece por cima no popover */
  nm_Opcao_top: string = "Editar"

  /**@description como o nome da opção que aparece por baixo no popover */
  nm_Opcao_bottom: string = "Excluir"

  /**@description Gira o triângulo do popover */
  b_Rotate_Triangle: boolean = false

  /**@description Recebe true quando o usuário clica no primeiro item do popover */
  onClick_Top: boolean

  /**@description Recebe o Id do usuário logado */
  cd_Conteudo_Selected: number

  /** @description Boolean para exibir ou fechar o modal de confirmação */
  b_Confirmation_Show_Modal: boolean

  /**@description Recebe o valor digitado pelo usuário no desktop */
  Input_Value: any

  /**@description Recebe o id do conteudo clicado */
  cd_Id_Conteudo: number

  /**@description Contém os dados do usuário que seram gravados */
  objDados = { cd_Conteudo: null, cd_Usuario: null }

  /**@description Recebe o Id do usuário logado */
  cd_User_Logged: any

  /**@description Contém da descrição do modal de alerta*/
  ds_Descricao: string = "Tem certeza que deseja excluir este conteúdo?"

  /**@description Objeto que recebe o conteudo dos inputs */
  objFilter = { nm_Nome: "", nm_Usuario: "", nm_Status: "" }

  /**@description Objeto que recebe os dados do Hasura */
  obj_Meus_Estudos = new MeusEstudosModel

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  constructor(
    private subject_service: SubjectService,
    private route: Router,
    private loginService: LoginService,
    private myfavorites: MeusEstudosService,
    private eRef: ElementRef,
    private conteudoService: ConteudoService
  ) { }

  ngOnInit(): void {
    const role_user = this.loginService.Name_Role()
    if (role_user == "user") {
      this.b_User_Admin = false
    }
    this.cd_User_Logged = this.loginService.Id_User_Logged()
    this.Get_My_Favorites()
  }

  async Start_Svg(estudo) {
    estudo.sn_favorito = !estudo.sn_favorito
    if (estudo.sn_favorito) {
      const responsefavorite = await this.myfavorites.Set_My_Study(estudo.conteudo.cd_conteudo)
      if (responsefavorite.erros) {
        this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Não foi possível concluir a ação' })
      }
      this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Favoritado com sucesso!' })
    } else {
      const responseaddestudo = await this.myfavorites.Delete_My_Study(estudo.conteudo.cd_conteudo)
      if (responseaddestudo.errors) {
        this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Não foi possível concluir a ação' })
      } else {
        this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Desfavoritado com sucesso!' })
      }
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
    }
  }

  async Get_My_Favorites() {
    const responsemystudies = await this.myfavorites.Get_My_Favorites()
    console.log(responsemystudies)
    responsemystudies.data.favoritos.forEach((item)=> item.sn_favorito = item.sn_favorito = true)
    if (responsemystudies.errors){
      this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Não foi possível trazer a listagem' })
    }
    this.obj_Array_Favoritos = responsemystudies.data.favoritos
  }

  onFilter_Search(iten) {
    this.Input_Value = iten
  }

  onClick_Option_Top(conteudo) {
    this.route.navigate(['/conteudo-editar', conteudo.conteudo.cd_conteudo])
    this.cd_Id_Conteudo = conteudo.conteudo.cd_conteudo
  }

  onClick_Option_Bottom(event, estudo) {
    this.b_Confirmation_Show_Modal = event
    this.cd_Id_Conteudo = estudo.conteudo.cd_conteudo
  }

  async onClick_Access(estudo) {
    
    this.objDados.cd_Conteudo = estudo.conteudo.cd_conteudo
    this.objDados.cd_Usuario = this.cd_User_Logged
    const responseacesso = await this.conteudoService.Set_Gravar_Dados(this.objDados)
    if (responseacesso.errors) {
      this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Não foi possível acessar' })
    } else {
      window.open(estudo.conteudo.ds_link, "_blank")
    }
  }

  Closed_Alert_Modal() {
    this.b_Confirmation_Show_Modal = false
  }

  async Set_Update_Conteudo() {
    const responseaddestudo = await this.myfavorites.Delete_My_Study(this.cd_Id_Conteudo)
    if (responseaddestudo.errors) {
      this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Não foi possível concluir a ação' })
    }
    const responsedeleteconteudo = await this.conteudoService.Set_Update_Conteudo(this.cd_Id_Conteudo)
    if (responsedeleteconteudo.errors) {
      this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Não foi possível deletar' })
    }
    else {
      this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Deletado com sucesso' })
    }
    this.Closed_Alert_Modal()
    this.onClick_Refresh()
  }

  async onClick_Refresh() {
    this.obj_Array_Favoritos = []
    this.Input_Value = null
    this.Get_My_Favorites()
  }

  Show_Modal(event) {
    this.b_Show_Filter = event
  }

  Close_Modal() {
    this.b_Show_Filter = false
  }

  Filtrar() {
  }

  Show_Popover(estudo) {
    estudo.show = !estudo.show
    if (estudo.show) {
      this.obj_Array_Favoritos.forEach(fe => {
        if (estudo.conteudo.cd_conteudo != fe.conteudo.cd_conteudo) {
          fe.show = false
        }
      })
    }
  }
}
