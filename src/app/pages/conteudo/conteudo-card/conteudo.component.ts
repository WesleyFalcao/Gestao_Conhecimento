import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubjectService } from 'src/app/services/subject.service';
import { ConteudoService } from '../conteudo.service';

@Component({
  selector: 'app-conteudo',
  templateUrl: './conteudo.component.html',
  styleUrls: ['./conteudo.component.scss']
})
export class ConteudoComponent implements OnInit, OnDestroy {

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
  ds_Titulo: string = "Complice"

  /**@description String para armazenar o caminho do svg */
  nm_Start: string = "assets/icons/star-with-no-background.svg"

  /**@description Boolean para exibir svg */
  b_User_Admin: boolean = true

  /**@description Boolean para exibir popover */
  b_Show_Popover: boolean = false

  /**@description define um comportamento diferente para o popover quando esta na tela de usuários */
  b_Rotate_Triangle: boolean = false

  /**@description recebe true quando o usuário clica no primeiro item do popover */
  onClick_Top: boolean

  /** @description Boolean para exibir ou fechar o modal de confirmação */
  b_Confirmation_Show_Modal: boolean

  /**@description Contém da descrição do modal de alerta*/
  ds_Descricao: string = "Tem certeza que deseja excluir este conteúdo?"

  /**@description Recebe o valor digitado pelo usuário no desktop */
  Input_Value: string

  /**@description Objeto que recebe o conteudo dos inputs */
  objFilter = { nm_Nome: "", nm_Usuario: "", nm_Status: "" }

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  /**@description Recebe o parâmetro da rota */
  cd_Id_Param: number

  /**@description Recebe o parâmetro da rota */
  subject_unsub: Subscription
  
  constructor(
    private route: Router,
    private routerParam: ActivatedRoute,
    private subject_service: SubjectService,
    private conteudoService: ConteudoService
  ) { 
  }

  visible: boolean = false;

  async ngOnInit() {
    this.subject_unsub = this.routerParam.params.subscribe((params: any)=>{
      this.cd_Id_Param = params['id']
    })
    
    const responseconteudo = await this.conteudoService.Get_Conteudo(this.cd_Id_Param)
    console.log(responseconteudo)
  }

  onClick_Option_Top() {
    this.route.navigate(['/conteudo-editar'])
  }

  Start_Svg() {
    this.b_Start = !this.b_Start
    if (this.b_Start) {
      this.nm_Start = "assets/icons/start-yellow.svg"
      this.subject_service.subject_Exibindo_Snackbar.next({ message: '' })
    } else {
      this.nm_Start = "assets/icons/star-with-no-background.svg"
      this.subject_service.subject_Exibindo_Snackbar.next({ message: '' })
    }
  }

  onClick_Option_Bottom(event) {
    this.b_Confirmation_Show_Modal = event
  }

  Closed_Alert_Modal() {
    this.b_Confirmation_Show_Modal = false
    this.b_Show_Popover = false
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

  ngOnDestroy(){
    this.subject_unsub.unsubscribe()
  }
}
