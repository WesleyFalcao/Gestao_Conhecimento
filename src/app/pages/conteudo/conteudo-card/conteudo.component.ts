import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConteudoModel } from 'src/app/models/conteudo/conteudo.model';
import { LoginService } from 'src/app/services/login.service';
import { SubjectService } from 'src/app/services/subject.service';
import { MeusEstudosService } from '../../meus-estudos/meus-estudos.service';
import { ConteudoService } from '../conteudo.service';

@Component({
  selector: 'app-conteudo',
  templateUrl: './conteudo.component.html',
  styleUrls: ['./conteudo.component.scss']
})
export class ConteudoComponent implements OnInit, OnDestroy {

  /**@description nome do label do primeiro input */
  obj_Array_Conteudos: Array<any>

  /**@description Array que vai conter os estudos de cada usuário */
  obj_Array_Meus_Estudos: Array<any>

  /**@description nome do label do primeiro input */
  nm_Label_Input_Filter_1: string = "Título"

  /**@description nome do label do segundo input */
  nm_Label_Input_Filter_2: string = "Subtitulo"

  /**@description caminho com o svg do topo */
  nm_Svg_Top: string = "assets/icons/edit.svg"

  /**@description caminho com o svg de baixo */
  nm_Svg_Bottom: string = "assets/icons/lixeira.svg"

  /**@description como o nome da opção que aparece por cima no popover */
  nm_Opcao_top: string = "Editar"

  /**@description como o nome da opção que aparece por baixo no popover */
  nm_Opcao_bottom: string = "Excluir"

  /**@description Boolean para exibir svg de okay no check-box */
  b_Start: boolean = false

  /**@description Titulo da página */
  ds_Titulo: string = ""

  /**@description String para armazenar o caminho do svg */
  nm_Star: string = "assets/icons/star-with-no-background.svg"

  /**@description Boolean para exibir svg */
  b_User_Admin: boolean = true

  /**@description define um comportamento diferente para o popover quando esta na tela de usuários */
  b_Rotate_Triangle: boolean = false

  /** @description Boolean para exibir ou fechar o modal de confirmação */
  b_Confirmation_Show_Modal: boolean

  /**@description Contém da descrição do modal de alerta*/
  ds_Descricao: string = "Tem certeza que deseja excluir este conteúdo?"

  /**@description Recebe o valor digitado pelo usuário na barra de pesquisa */
  Input_Value: string

  /**@description Objeto que recebe o conteudo dos inputs */
  objFilter = { nm_Nome: "", nm_Usuario: "", nm_Status: "" }

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  /**@description Contém os dados do usuário que seram gravados */
  objDados = { cd_Conteudo: null, nm_Usuario: "" }

  /**@description Recebe o parâmetro da rota */
  cd_Id_Param: number

  /**@description Recebe o id do conteudo varitado pelo usuário */
  cd_Favorite: number

  /**@description Recebe o id de cada conteudo */
  cd_Conteudo: number

  /**@description Recebe o Id do usuário logado */
  cd_User_Logged: any

  /**@description Recebe o id do conteudo clicado */
  cd_Id_Conteudo: number

  /**@description Recebe o nome do usário que adicionou a sugestão */
  nm_User: string

  /**@description Recebe o parâmetro da rota */
  subject_unsub: Subscription

  /**@description Recebe os campos dos conteudos */
  objFilds = new ConteudoModel

  /**@description Recebe as informações do usuário para favoritar um conteúdo */
  objFavorite = { cd_usuario: null, cd_conteudo: "" }

  constructor(
    private route: Router,
    private routerParam: ActivatedRoute,
    private loginService: LoginService,
    private subject_service: SubjectService,
    private meuestudosService: MeusEstudosService,
    private conteudoService: ConteudoService
  ) {
  }

  async ngOnInit() {
    
    this.nm_User = this.loginService.Name_User_Logged()
    this.subject_unsub = this.routerParam.params.subscribe((params: any) => {
      this.cd_Id_Param = params['id']
      this.cd_User_Logged = this.loginService.Id_User_Logged()
    })

    const responseconteudo = await this.conteudoService.Get_Conteudo(this.cd_Id_Param)
    this.obj_Array_Conteudos = responseconteudo.data.conteudos
    this.ds_Titulo = this.obj_Array_Conteudos[0].categoria.nome

    this.Get_My_Estudies()
  }

  async onClick_Favorite(conteudo) {
    conteudo.favorite = !conteudo.favorite
    this.b_Start = !this.b_Start
    if (conteudo.favorite) {
      this.nm_Star = "assets/icons/start-yellow.svg"
      this.objFavorite.cd_usuario = this.cd_User_Logged
      this.objFavorite.cd_conteudo = conteudo.cd_conteudo
      const responsefavorito = await this.meuestudosService.Set_My_Study(conteudo.cd_conteudo)
      console.log(responsefavorito)
      if (responsefavorito.errors) {
        this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Não foi possível favoritar' })
      } else {
        this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Favoritado com sucesso' })
      }
    } else {
      this.nm_Star = "assets/icons/star-with-no-background.svg"
      this.objFavorite.cd_usuario = this.cd_User_Logged
      this.objFavorite.cd_conteudo = conteudo.cd_conteudo
      const responsedesfavoritar = await this.meuestudosService.Delete_My_Study(conteudo.cd_conteudo)
      if (responsedesfavoritar.erros) {
        this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Não foi possível desfavoritar' })
      } else {
        this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Desfavoritado com sucesso' })
      }
    }
  }

  async Get_My_Estudies() {
    const responsemystudies = await this.meuestudosService.Get_Cd_Studies()
    if (responsemystudies.errors) {
      this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Não foi possível trazer a listagem' })
    }
    this.obj_Array_Conteudos.forEach((iten)=>{
      this.cd_Conteudo = iten.cd_conteudo
      console.log("conteudo", this.cd_Conteudo)
    })

    this.obj_Array_Meus_Estudos = responsemystudies.data.estudos
      this.obj_Array_Meus_Estudos.forEach((iten)=>{
      this.cd_Favorite = iten.conteudo.cd_conteudo
      console.log("favorito", this.cd_Favorite)
    })
  }

  onClick_Option_Top() {
    this.route.navigate(['/conteudo-editar', this.cd_Id_Conteudo])
    console.log(this.cd_Id_Param)
  }

  async OnClick_Access(conteudo) {

    this.objDados.cd_Conteudo = conteudo.cd_conteudo
    this.objDados.nm_Usuario = this.nm_User
    const responseacesso = await this.conteudoService.Set_Gravar_Dados(this.objDados)
    if (responseacesso.errors) {
      this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Não foi possível acessar' })
    } else {
      window.open(conteudo.ds_link, "_blank")
    }
  }
  
  onFilter_Search(iten) {
    this.Input_Value = iten
  }

  onClick_Option_Bottom(event) {
    this.b_Confirmation_Show_Modal = event
  }

  async Set_Delete_Conteudo() {
    console.log(this.cd_Id_Conteudo)
    const responsedeleteconteudo = await this.conteudoService.Set_Delete_Conteudo(this.cd_Id_Conteudo)
    this.Closed_Alert_Modal()
    this.onClick_Refresh()
  }

  Closed_Alert_Modal() {
    this.b_Confirmation_Show_Modal = false
    
  }

  async onClick_Refresh() {
    const responseconteudo = await this.conteudoService.Get_Conteudo(this.cd_Id_Param)
    this.obj_Array_Conteudos = responseconteudo.data.conteudos
  }

  Filtrar() {
    console.log(this.objFilter)
    this.b_Show_Filter = false
  }

  Close_Modal() {
    this.b_Show_Filter = false
  }

  Show_Modal(event) {
    this.b_Show_Filter = event
  }

  Show_Popover(conteudo) {
    conteudo.show = !conteudo.show
    if (conteudo.show) {
      this.obj_Array_Conteudos.forEach(fe => {
        if (conteudo.cd_conteudo != fe.cd_conteudo) {
          fe.show = false
        }
      })
    }
  }

  ngOnDestroy() {
    this.subject_unsub.unsubscribe()
  }
}
