import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subject.service';

@Component({
  selector: 'app-meus-estudos',
  templateUrl: './meus-estudos.component.html',
  styleUrls: ['./meus-estudos.component.scss']
})
export class MeusEstudosComponent implements OnInit {

  /**@description nome do label do primeiro input */
  nm_Label_Input_1: string = "Título"

  /**@description nome do label do segundo input */
  nm_Label_Input_2: string = "Subtitulo"

  /**@description Boolean para exibir svg de okay no check-box */
  b_Start: boolean = true

  /**@description Titulo da página */
  ds_Titulo: string = "Meus estudos"

  /**@description String para armazenar o caminho do svg */
  nm_Start: string = "assets/icons/start-yellow.svg"

  /**@description Boolean para exibir svg */
  b_User_Admin: boolean = true

  /**@description Boolean para exibir popover */
  b_Show_Popover: boolean = false

  /**@description Boolean para exibir popover no filtro */
  b_Filter_Show_Popover: boolean = false
  
  /**@description caminho com o svg do topo */
  nm_Svg_Top: string = "assets/icons/edit.svg"

/**@description caminho com o svg de cima no filtro */
  nm_Filter_Svg_Top: string = "assets/icons/filter.svg"

  /**@description caminho com o svg de baixo */
  nm_Svg_Bottom: string = "assets/icons/lixeira.svg"

  /**@description caminho com o svg de baixo no filtro*/
  nm_Filter_Svg_Bottom: string = "assets/icons/lixeira.svg"

  /**@description como o nome da opção que aparece por cima no popover */
  nm_Opcao_top: string = "Editar"

  /**@description Boolean que recebe o evento de fechamento de modal */
  b_Closed_Modal: boolean

  /**@description Título da página */
  ds_Titulo_Filter: string = "Filtros"

  /**@description como o nome da opção que aparece por cima no popover do filtro */
  nm_Filter_Opcao_top: string = "Filtrar"

  /**@description como o nome da opção que aparece por baixo no popover */
  nm_Opcao_bottom: string = "Excluir"

  /**@description como o nome da opção que aparece por baixo no popover do Filtro*/
  nm_Filter_Opcao_bottom: string = "Limpar filtros"

  /**@description Gira o triângulo do popover */
  b_Rotate_Triangle: boolean = false

  /**@description Gira o triângulo do popover no filtro */
  b_Filter_Rotate_Triangle: boolean = true

  /**@description Recebe true quando o usuário clica no primeiro item do popover */
  onClick_Top: boolean

  /** @description Boolean para exibir ou fechar o modal de confirmação */
  b_Confirmation_Show_Modal: boolean

  /** @description Boolean para exibir ou fechar o modal de filtro */
  b_Filter_Show_Modal: boolean

  /**@description Contém da descrição do modal de alerta*/
  ds_Descricao: string = "Tem certeza que deseja excluir este conteúdo?"

  constructor(
    private subject_service: SubjectService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  Start_Svg() {
    this.b_Start = !this.b_Start
    if (this.b_Start) {
      this.nm_Start = "assets/icons/start-yellow.svg"
      this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Para listar os planos selecione um subcontrato ao lado.' })
    } else {
      this.nm_Start = "assets/icons/star-with-no-background.svg"
      this.subject_service.subject_Exibindo_Snackbar.next({ message: 'Para listar os planos selecione um subcontrato ao lado.' })
    }
  }

  visible: boolean = false;

  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }

  onClick_Option_Top() {
    this.router.navigate(['/conteudo-editar'])
  }

  onClick_Option_Bottom(event) {
    this.b_Confirmation_Show_Modal = event
  }

  onFilter_Popover(event) {
    this.onClick_Top = event
    if (this.onClick_Top) {
      this.b_Filter_Show_Modal = true
    } else {
      this.b_Filter_Show_Modal = false
    }
  }

  Closed_Modal(event){
    this.b_Closed_Modal = event
    this.b_Filter_Show_Popover = false
    this.b_Filter_Show_Modal = false
  }

  Closed_Alert_Modal(){
    this.b_Confirmation_Show_Modal = false
    this.b_Show_Popover = false
  }
}
