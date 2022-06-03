import { Component, HostListener, OnInit } from '@angular/core';
import { SubjectService } from 'src/app/services/subject.service';
import { SugestoesService } from '../sugestoes.service';

@Component({
  selector: 'app-sugestoes-lista',
  templateUrl: './sugestoes-lista.component.html',
  styleUrls: ['./sugestoes-lista.component.scss']
})
export class SugestoesListaComponent implements OnInit {

  /**@description boolean para abrir e fechar o modal */
  b_Show_Modal: boolean = false

  /**@description Título da página */
  ds_Titulo_Filter: string = "Filtros"

  /**@description Boolean que recebe o evento de fechamento de modal */
  b_Closed_Modal: boolean

  /**@description Título da página */
  ds_Titulo: string = "Sugestões arquivadas"
  
  /**@description recebe a largura atual da tela */
  nr_Width: number

  /**@description boolean que fica true acima de 1034px */
  b_Width: boolean

  /**@description Recebe o valor digitado pelo usuário no desktop */
  Input_Value: string

  /** @description Boolean para exibir ou fechar o modal de confirmação */
  b_Confirmation_Show_Modal: boolean

  /**@description Contém da descrição do modal de alerta*/
  ds_Descricao: string = "Tem certeza que deseja desarquivar?"

  /**@description Boolean para abrir e fechar o modal de filtro */
  b_Show_Filter: boolean = false

  /**@description Recebe o id da sugestão clicada */
  cd_Sugestao: number

  /**@description Recebe o index da sugestão clicada */
  cd_Index: number

  /**@description Objeto que recebe o conteudo dos inputs */
  objFilter = { ds_Titulo: "", ds_Descricao: "", cd_id: ""}

  /**@description Recebe o array de sugestões arquivadas */
  obj_Array_Sugestoes_Arquivadas

  constructor(
    private sugestoesService: SugestoesService,
    private subjectService: SubjectService
  ) { }

  async ngOnInit(){
    this.onResize()
    const responselist = await this.sugestoesService.Get_Files_Suggestion()
    this.obj_Array_Sugestoes_Arquivadas = responselist.data.sugestoes
  }

  @HostListener('window:resize')
  onResize() {
    this.nr_Width = window.innerWidth
    if (this.nr_Width >= 1023) {
      this.b_Width = true
    } else {
      this.b_Width = false
    }
  }

  Show_Itens(item) {
    item.show = !item.show
    if(item.show){
      this.obj_Array_Sugestoes_Arquivadas.forEach(fe => {
        if(item.cd_sugestao != fe.cd_sugestao){
          fe.show = false
        }
      })
    }
  }

  onClick_Unarchive(iten, index){
    this.b_Confirmation_Show_Modal = true
    this.cd_Sugestao = iten
    this.cd_Index = index
  }

  async Unarchive(){
    this.b_Confirmation_Show_Modal = false
    const responseunarchive = await this.sugestoesService.Set_Unarchive_Suggestion(this.cd_Sugestao)
    if(responseunarchive.errors){
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Não foi possível desarquivar' })
    }else{
      this.subjectService.subject_Exibindo_Snackbar.next({ message: 'Desarquivado com sucesso!' })
      this.obj_Array_Sugestoes_Arquivadas.splice(this.cd_Index, 1)
    }
  }

  Closed_Alert_Modal() {
    this.b_Confirmation_Show_Modal = false
  }

  onClick_Option_Bottom(event) {
    this.b_Confirmation_Show_Modal = event
  }

  async onClick_Refresh(){
    const responselist = await this.sugestoesService.Get_Files_Suggestion()
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
}
