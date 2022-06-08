import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MeusEstudosModel } from 'src/app/models/meus-estudos/meus-estudos.model';
import { LoginService } from 'src/app/services/login.service';
import { SubjectService } from 'src/app/services/subject.service';
import { ConteudoService } from '../conteudo/conteudo.service';
import { MeusEstudosService } from './meus-estudos.service';

@Component({
  selector: 'app-meus-estudos',
  templateUrl: './meus-estudos.component.html',
  styleUrls: ['./meus-estudos.component.scss']
})
export class MeusEstudosComponent implements OnInit {

  /**@description Titulo da página */
  ds_Titulo: string = "Meus estudos"

  /**@description Array que vai conter os estudos de cada usuário */
  Obj_Array_Meus_Estudos: Array<any>

  /**@description String para armazenar o caminho do svg */
  nm_Start: string = "assets/icons/start-yellow.svg"

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
  Input_Value: string

  /**@description Contém os dados do usuário que seram gravados */
  objDados = { cd_Conteudo: null, nm_Usuario: "" }

  /**@description Recebe o nome do usário que adicionou a sugestão */
  nm_User: string

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
    private router: Router,
    private loginService: LoginService,
    private meuestudosService: MeusEstudosService,
    private eRef: ElementRef,
    private conteudoService: ConteudoService
  ) { }

  ngOnInit(): void {
    this.nm_User = this.loginService.Name_User_Logged()
    this.Get_My_Estudies()
  }

  async Start_Svg(estudo) {
    estudo.favorite = !estudo.favorite
    if (!estudo.favorite) {

      this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Favoritado com sucesso!' })
      const responsedeleteestudo = await this.meuestudosService.Set_My_Study(estudo.conteudo.cd_conteudo)
      if (responsedeleteestudo.erros) {
        this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Não foi possível concluir a ação' })
      }
    } else {

      this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Desfavoritado com sucesso!' })
      const responseaddestudo = await this.meuestudosService.Delete_My_Study(estudo.conteudo.cd_conteudo)
      if (responseaddestudo.erros) {
        this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Não foi possível concluir a ação' })
      }
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
    }
  }

  async Get_My_Estudies() {
    const responsemystudies = await this.meuestudosService.Get_My_Studies()
    if (responsemystudies.errors) {
      this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Não foi possível trazer a listagem' })
    }
    this.Obj_Array_Meus_Estudos = responsemystudies.data.estudos
    console.log(this.Obj_Array_Meus_Estudos)
  }

  onFilter_Search(iten) {
    this.Input_Value = iten
  }

  onClick_Option_Top() {
    this.router.navigate(['/conteudo-editar'])
  }

  onClick_Option_Bottom(event) {
    this.b_Confirmation_Show_Modal = event
  }

  async OnClick_Access(estudo) {

    this.objDados.cd_Conteudo = estudo.conteudo.cd_conteudo
    console.log("estudo",estudo)
    this.objDados.nm_Usuario = this.nm_User
    const responseacesso = await this.conteudoService.Set_Gravar_Dados(this.objDados)
    console.log(responseacesso)
    if (responseacesso.errors) {
      this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Não foi possível acessar' })
    } else {
      window.open(estudo.ds_link, "_blank")
    }
  }

  Closed_Alert_Modal() {
    this.b_Confirmation_Show_Modal = false
 
  }

  Show_Modal(event) {
    this.b_Show_Filter = event
  }

  Close_Modal() {
    this.b_Show_Filter = false
  }

  Filtrar() {
    console.log(this.objFilter)
  }

  Show_Popover(estudo) {
    estudo.show = !estudo.show
    if (estudo.show) {
      this.Obj_Array_Meus_Estudos.forEach(fe => {
        if (estudo.conteudo.cd_conteudo != fe.conteudo.cd_conteudo) {
          fe.show = false
        }
      })
    }
  }
}
