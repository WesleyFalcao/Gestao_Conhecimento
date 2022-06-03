import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-meus-estudos',
  templateUrl: './meus-estudos.component.html',
  styleUrls: ['./meus-estudos.component.scss']
})
export class MeusEstudosComponent implements OnInit {

  /**@description Titulo da página */
  ds_Titulo: string = "Meus estudos"

  /**@description String para armazenar o caminho do svg */
  nm_Start: string = "assets/icons/start-yellow.svg"

  /**@description Boolean para exibir svg de okay no check-box */
  b_Start: boolean = true

  /**@description String que contém o nome do grupo do card expecífico*/
  nm_Grupo: string = "Complice"

  /**@description Boolean para exibir svg */
  b_User_Admin: boolean = true

  /**@description Boolean para exibir popover */
  b_Show_Popover: boolean = false

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
  cd_Id_User_Logged: number

  /** @description Boolean para exibir ou fechar o modal de confirmação */
  b_Confirmation_Show_Modal: boolean

  /**@description Contém da descrição do modal de alerta*/
  ds_Descricao: string = "Tem certeza que deseja excluir este conteúdo?"

  /**@description Objeto que recebe o conteudo dos inputs */
  objFilter = { nm_Nome: "", nm_Usuario: "", nm_Status: "" }

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  constructor(
    private subject_service: SubjectService,
    private router: Router,
    private loginService: LoginService,
    private eRef: ElementRef
  ) { }

  ngOnInit(): void {
    this.cd_Id_User_Logged = this.loginService.Id_User_Logged()
    
  }

  Start_Svg() {
    this.b_Start = !this.b_Start
    if (this.b_Start) {
      this.nm_Start = "assets/icons/start-yellow.svg"
      this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Favoritado com sucesso!' })
    } else {
      this.nm_Start = "assets/icons/star-with-no-background.svg"
      this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Desfavoritado com sucesso!' })
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
    
    } else {
      this.b_Show_Popover = false;
    }
  }

  onClick_Option_Top() {
    this.router.navigate(['/conteudo-editar'])
  }

  onClick_Option_Bottom(event) {
    this.b_Confirmation_Show_Modal = event
  }

  Closed_Alert_Modal() {
    this.b_Confirmation_Show_Modal = false
    this.b_Show_Popover = false
  }

  Show_Modal(event){
    this.b_Show_Filter = event
  }

  Close_Modal() {
    this.b_Show_Filter = false
  }

  Filtrar() {
    console.log(this.objFilter)
  }
}
